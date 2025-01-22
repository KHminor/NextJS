'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.'
  }),
  amount: z.coerce.number().gt(0, { message: 'please enter an amount greater than $0.'}),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status'
  }),
  date: z.string(),
})

const CreateInvoice = FormSchema.omit({ id: true, date: true});
const UpdateInvoice = FormSchema.omit({ id: true, date: true})


export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};


// insert
export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields =  CreateInvoice.safeParse( {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  });

  if (!validatedFields.success) {    
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Created Invoice'
    }
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = Math.round(amount * 100); // 센트화
  const date = new Date().toISOString().split('T')[0]; // 날짜 YYYY-MM-DD 형식 변경

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.'
    }
  }

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}


// update
export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  const validateFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Created Invoice'
    }
  }

  const {customerId, amount, status} = validateFields.data;
  const amountInCents = Math.round(amount * 100);
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error){
    // console.log(`updateInvoice Error: ${error}`);
    // throw new Error('update Invoice Data Error')
    return {
      message: 'Database Error: Failed to Update Invoice.'
    }
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


// delete
export async function deleteInvoice(id: string) {
  try {await sql`DELETE FROM invoices WHERE id = ${id}`;}
  catch (error) {
    console.log(`deleteInvoice Error: ${error}`);
    throw new Error('delete Invoice Error')    
  }
  revalidatePath('/dashboard/invoices')
}


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials';
          default:
            return 'Something went wrong';
      } 
    }
    throw error;
  }
}
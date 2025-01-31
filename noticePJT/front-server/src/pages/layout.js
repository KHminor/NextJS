import MainNav from '../../util/MainNav';

export default function Layout({ children }) {
  return (
    <div className="flex justify-center items-start">
      <div className="container">
        <MainNav />
        {children}
      </div>
    </div>
  );
}

import { useRouter } from 'next/router';
import Profile from '../../components/userProfile';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

const ProfilePage = ({ item }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Profile {...item} />
      <Footer />
    </div>
  );
};

export async function getStaticPaths() {
    const res = await fetch('http://localhost:3001/users');
    const users = await res.json();
    
    const paths = users.map((user) => ({
        params: { profile: user.id.toString() },
    }));
    
    return { paths, fallback: true };
};
export async function getStaticProps({params}) {
    const res = await fetch(`http://localhost:3001/users/${params.profile}`);
    const item = await res.json();
    console.log(item);
    return { props: { item } };
};
    // export default withAuth(ProfilePage);
export default ProfilePage;





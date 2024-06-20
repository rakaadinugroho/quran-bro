export async function getServerSideProps() {
    return {
        redirect: {
            destination: '/1', // will redirect to alfatihah
            permanent: false,
        }
    }
}

export default function QuranPage() {
  return null;
}
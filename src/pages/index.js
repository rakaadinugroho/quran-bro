export async function getServerSideProps() {
    return {
        redirect: {
            destination: '/al-fatihah', // will redirect to alfatihah
            permanent: false,
        }
    }
}

export default function QuranPage() {
  return null;
}
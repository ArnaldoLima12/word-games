import { useRouter } from "next/router"

const Verify = () => {
  
  const router = useRouter();
  const {email, password} = router.query;
  console.log(email, password);
  
}
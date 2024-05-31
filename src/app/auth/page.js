import Container from "@/components/Container";
import FormLogin from "@/components/FormLogin";

export default function Auth() {
  
  return (
    <Container>
      <main className="flex items-center justify-center h-full">
        <FormLogin></FormLogin>
      </main>
    </Container>
  );
}

import Container from "@/components/Container";
import Header from "@/components/Header";
import Link from "next/link";

export const fetchCache = 'force-no-store';

export default function Ferramentas()
{
    return(
        <Container>
            <Header auth={false}/>

            <main>
                <ul>
                    <li><Link href={'https://store.brewology.com/ahomebrew.php?brewid=310'}>WebMan Mod - PrepIso</Link></li>
                    <li><Link href={'https://terabox.com/s/1DTQrcFj9tQZ4-KWn4QRX8g'}>Split4G</Link></li>
                </ul>
            </main>
        </Container>
    )
}
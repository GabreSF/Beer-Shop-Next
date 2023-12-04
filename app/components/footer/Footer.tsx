import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="bg-slate-500 text-slate-200 text-sm mt-16">
            <Container>
                <div className="flex flex-wrap justify-between pt-5 pb-5">
                    <FooterList>
                        <h3>Copyright © Gabriel - Made by Gabriel</h3>
                    </FooterList>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Contate-me</h3>
                        <div className="flex gap-2">
                            <Link target="_blank" href="https://github.com/GabreSF">
                                <IoLogoGithub size={24} />
                            </Link>
                            <Link target="_blank" href="https://www.linkedin.com/in/gabriel-schifelbein-79711020a/">
                                <FaLinkedin size={24} />
                            </Link>
                            <Link target="_blank" href="https://api.whatsapp.com/send?phone=5551982412366">
                                <FaWhatsapp size={24} />
                            </Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </div>
    );
};

export default Footer;

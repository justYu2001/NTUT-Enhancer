import { useTranslation } from "react-i18next";
import { IoEarth } from "react-icons/io5";

import "@/index.css";
import "@/utils/i18n";
import Link from "./Link";
import { getOppositeLanguage, changeLanguage } from "@/utils/localization";
import NPCLogo from "url:/assets/images/NPC.png";
import Logo from "url:/assets/images/logo.png";

const Popup = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className="w-96 rounded-md p-3">
            <div className="flex justify-between items-end border-b-2 border-slate-300 py-2 font-medium">
                <h1 className="flex items-center text-2xl text-sky-500">
                    <img src={Logo} className="mr-1.5 block h-8 w-8" />
                    NTUT Enhancer
                </h1>
                <button className="flex items-center text-lg text-slate-400 hover:text-sky-500" onClick={() => changeLanguage(i18n)}>
                    {getOppositeLanguage(i18n)}
                    <IoEarth className="text-2xl ml-0.5" />
                </button>
            </div>
            <ul>
                <Link href="https://nportal.ntut.edu.tw/">{t("ntut protal")}</Link>
                <Link href="https://github.com/justYu2001/NTUT-Enhancer">{t("project link")}</Link>
            </ul>
            <div className="mt-0.5 flex items-center px-0.5">
                <p className="mr-0.5 tracking-wide text-gray-400">{t("NPC")}</p>
                <img className="w-5" src={NPCLogo} />
            </div>
        </div>
    );
};

export default Popup;

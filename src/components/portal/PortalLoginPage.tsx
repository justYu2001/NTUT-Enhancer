import "@/index.css";
import NTUTLogo from "@/assets/images/ntut-logo.png";
import RedHouseImage from "@/assets/images/red-house.jpeg";
import Image from "@/components/common/Image";
import LoginForm from "@/components/portal/PortalLoginForm";

const PortalLoginContainer = () => {
    return (
        <div className="grid h-screen min-w-[960px] grid-cols-2">
            <div>
                <Image
                    src={RedHouseImage}
                    className="h-full w-full object-cover object-[50%]"
                />
            </div>
            <div className="relative flex flex-col items-center justify-center">
                <div className="my-8 w-80">
                    <Image src={NTUTLogo} />
                    <h1 className="mt-4 text-center text-2xl font-medium tracking-wider text-blue-600">
                        校園入口網站登入
                    </h1>
                </div>
                <LoginForm />
                <p className="absolute bottom-8">
                    無法登入嗎？請參考
                    <a
                        href="https://cnc.ntut.edu.tw/p/404-1004-2622.php"
                        target="_blank"
                        rel="noreferrer noopenner"
                        className="font-medium text-blue-600"
                    >
                        登入說明
                    </a>
                    或
                    <a
                        href="https://cnc.ntut.edu.tw/p/404-1004-105989-1.php?Lang=zh-tw"
                        target="_blank"
                        rel="noreferrer noopenner"
                        className="font-medium text-blue-600"
                    >
                        手機驗證說明
                    </a>
                </p>
            </div>
        </div>
    );
};

export default PortalLoginContainer;

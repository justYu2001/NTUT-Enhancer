import { FormEvent, useState } from "react";

import "@/index.css";
import Input from "@/components/portal/PortalLoginInput";

type FormInputEvent = FormEvent<HTMLInputElement>;

const PortalLoginForm = () => {
    const [studentID, setStudentID] = useState("");

    const handelStudentIDInputChange = (event: FormInputEvent) => {
        setStudentID(event.currentTarget.value);
    };

    const [password, setPassword] = useState("");

    const handelPasswordInputChange = (event: FormInputEvent) => {
        setPassword(event.currentTarget.value);
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <form
            action="login.do"
            method="post"
            className="flex w-96 flex-col"
            onSubmit={() => setIsLoggedIn(true)}
        >
            <Input
                id="student-id"
                name="muid"
                label="學號"
                value={studentID}
                onChange={handelStudentIDInputChange}
            />
            <Input
                type="password"
                id="password"
                name="mpassword"
                label="密碼"
                value={password}
                autoComplete="current-password"
                onChange={handelPasswordInputChange}
            />
            <a
                href="https://cnc.ntut.edu.tw/p/404-1004-3890.php?Lang=zh-tw"
                target="_blank"
                rel="noreferrer noopenner"
                className="-my-1 self-start pl-1 text-slate-400 transition-colors duration-300 hover:text-slate-500"
            >
                忘記密碼？
            </a>
            <button
                type="submit"
                disabled={
                    studentID.length === 0 || password.length === 0 || isLoggedIn
                }
                className="mt-10 rounded bg-blue-600 py-2 text-xl font-bold tracking-wide text-white disabled:bg-blue-600/40"
            >
                登入
            </button>
        </form>
    );
};

export default PortalLoginForm;

import type { i18n as I18N } from "i18next";

export const getOppositeLanguage = (i18n: I18N) => {
    if (i18n.language === "zh") {
        return "English";
    } else {
        return "中文";
    }
};

export const changeLanguage = (i18n: I18N) => {
    if (i18n.language === "zh") {
        i18n.changeLanguage("en");
    } else {
        i18n.changeLanguage("zh");
    }
};

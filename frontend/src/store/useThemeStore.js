import {create} from "zustand"

const VALID_THEMES =["light","dark"]

export const useThemeStore = create((set) =>({
    theme:VALID_THEMES.includes(localStorage.getItem("chat-theme")) ? localStorage.getItem("chat-theme") : "light",

    setTheme:(theme) =>{
        if(!VALID_THEMES.includes(theme)) return
        localStorage.setItem("chat-theme",theme)
        set({theme})
    }
}))
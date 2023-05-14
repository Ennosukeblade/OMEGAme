import { ReactNode, useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { JsxElement } from "typescript";
type Types = {
    children: ReactNode
}
function ScrollToTopNavigator({ children }: Types) {
    const location = useLocation();
    const navType = useNavigationType();
    useEffect(() => {
        if (navType !== "POP") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }, [location]);
    return <>{children}</>;
}
export default ScrollToTopNavigator;
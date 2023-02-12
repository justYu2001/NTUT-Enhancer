import PortalLoginPage from "@/components/portal/PortalLoginPage";
import injectReactNode from "@/utils/react-node-injector";

const portalLoginPageRoot = document.createElement("div");
portalLoginPageRoot.id = "portal-login-page-root";
document.body.append(portalLoginPageRoot);

injectReactNode(portalLoginPageRoot, <PortalLoginPage />);
import "../../modules.css"
import passwordModule from "../../../../../module_details/passwords.json";
import Link from "next/link";

export function ModuleHeader(){
    const titleScreen = passwordModule.screens.find(
        (screen) => screen.id === "title-screen"
      );
    if (!titleScreen || !titleScreen.titleParts) {
      return <div>Title screen not found</div>;
    }
    const { titleParts } = titleScreen;
    return(
        <div className="module_header">
            <h2>Modules → <b>Phishing Attacks</b></h2>
            <h1>
                {titleParts.start}
                <b>{titleParts.highlight}</b>
                {titleParts.middle}
                <span>{titleParts.accent}</span>
            </h1>
        </div>
    )
}

export default function PasswordContext() {
    const contextScreen = passwordModule.screens.find(
        (screen) => screen.id === "context-screen"
      );
    if (!contextScreen) {
      return <div>Context screen not found</div>;
    }
      const currentStep = 2;
      const totalSteps = 4;
      const progressPercent = (currentStep / totalSteps) * 100;
    return(
        <div>
            <ModuleHeader/>
            <div className="context_content">
                
                <div className="context_text">
                    <h1>Problem Context</h1>
                    <p>{contextScreen.context}</p>
                    <Link href="/modules/password/mcq" className="button">
                        Next
                    </Link>
                </div>
            </div>
            <div className="module_progress_footer">
                <div className="module_progress_bar">
                <div
                    className="module_progress_fill"
                    style={{ width: `${progressPercent}%` }}
                ></div>
                </div>
                <span>{currentStep}/{totalSteps}</span>
            </div>
        </div>
    )
}
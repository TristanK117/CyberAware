import "../modules.css"
import passwordModule from "../../../../module_details/passwords.json";
import Link from "next/link";

export default function PasswordPage() {
    const titleScreen = passwordModule.screens.find(
        (screen) => screen.id === "title-screen"
    );
    if (!titleScreen || !titleScreen.titleParts) {
        return <div>Title screen not found</div>;
    }
    const { titleParts } = titleScreen;
      const currentStep = 1;
      const totalSteps = 4;
      const progressPercent = (currentStep / totalSteps) * 100;
      return (
        <div>
            <div className="opening_page">
                <div className="modules_text">
                    <h1>
                        {titleParts.start}
                        <b>{titleParts.highlight}</b>
                        {titleParts.middle}
                        <span>{titleParts.accent}</span>
                    </h1>

                    <h2>{titleScreen.subtitle}</h2>

                    <h3>SUMMARY</h3>
                    <ul>
                        {titleScreen.agenda.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="modules_image">
                    <img src={titleScreen.img} alt="opening page password image" />
                    <Link href="/modules/password/context" className="button">
                        Start Module
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
    );
}
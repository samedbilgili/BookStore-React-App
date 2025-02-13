export default function Jumbotron({ junbotronStrings }) {
    return (
        <>
            <div class="jumbotron">
                <h1 class="display-4">{junbotronStrings.junbotronHeadTitle}</h1>
                <p class="lead">{junbotronStrings.junbotronDescription}</p>
                <hr class="my-4" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <p class="lead">
                    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                </p>
            </div>
        </>
    )
}
import Balancer from "react-wrap-balancer";

export default function Description({ page, description }: { page: string; description: string }) {
    return (
        <section className="w-full">
            <h1 className="text-4xl font-semibold ">{page}</h1>
            {
                description.length > 0 && (
                    <p className="my-6 text-base font-mono opacity-70">
                        <Balancer>{description}</Balancer>
                    </p>
                )
            }
        </section>
    )
}
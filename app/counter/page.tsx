import Counter from "../components/Counter";

const page = () => {
    return (
        <div>
            <h1 className="font-bold text-2xl text-center p-6">Counter</h1>
            <Counter />
            <Counter />
            <Counter />
        </div>
    );
}

export default page;
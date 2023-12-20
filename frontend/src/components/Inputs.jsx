/* eslint-disable react/prop-types */
function Inputs({ type, onChange, id, name, label, ...props }) {
    return (
        <div className="flex justify-between text-white items-center w-full">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                onChange={onChange}
                {...props}
                className="bg-slate-400 outline-none md:w-2/3 text-black px-5 py-1 focus:border-b-4 border-amber-600"
            />
        </div>
    );
}

export default Inputs;

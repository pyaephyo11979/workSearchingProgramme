// eslint-disable-next-line react/prop-types
function CreateJobInputs({ label, id, type, onChange, name }) {
    return (
        <div className="flex flex-col gap-5 text-white">
            <label htmlFor={id}>{label}</label>
            <input
                name={name}
                id={id}
                type={type}
                placeholder={label}
                onChange={onChange}
                className="p-2 bg-slate-400 text-black"
            />
        </div>
    );
}

export default CreateJobInputs;

const Uploadform = () => {
  return (
    <div className="text-center mt-10">
        <form className="flex items-center flex-col gap-8">
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
            <button className="btn Ggap-3">Upload</button>
        </form>
    </div>
  )
}

export default Uploadform

export default function Navigator() {
    return <div className="flex items-center justify-between p-5 border-b border-gray-700">
        <section className="flex items-center gap-3">
            <img 
                src="https://cdn-icons-png.flaticon.com/512/9973/9973495.png" 
                height="20px"
                width="20px"
            />

            <h2>
                Music Player
            </h2>
        </section>

        <section className="flex items-center gap-3 select-none cursor-pointer hover:opacity-70 transition-all">
            <span className="material-symbols-outlined">keyboard_arrow_down</span>

            Xavier Morell
        </section>
    </div>
}
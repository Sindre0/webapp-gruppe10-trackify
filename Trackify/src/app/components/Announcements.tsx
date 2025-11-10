export default function Announcements() {
    const announcements = [
        { id: 1, name: "Brus og pizza" },
        { id: 2, name: "Amogus i Aud 6.." },
        { id: 3, name: "Lær C# med studentforeningen!" },
        { id: 4, name: "FIFA Turnering" },
        { id: 5, name: "Catan Championship" },
        { id: 6, name: "Overwatch League" },
        { id: 7, name: "Dungeons & Dragons Campaign" },
        { id: 8, name: "Bjørn Vidar be like" },
        { id: 9, name: "Overwatch League" },
    ];

    return (
        <section className="w-full h-full">
            <h2 className="text-lg mb-3">Announcements</h2>
            <ul className="px-5 py-3 border border-gray-300 shadow-md mx-auto mb-6 space-y-3">
                {announcements.map((element) => (
                    <li className="border-b border-black/10 pb-2" key={element.id}>
                        {element.name}
                    </li>
                ))}
                <a className="block mt-4 text-blue-600 text-sm text-center" href="#">View All</a>
            </ul>
        </section>
    );
}

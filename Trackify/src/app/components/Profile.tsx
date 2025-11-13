export default function Profile() {
  return (
    <main className="flex flex-col items-center space-y-4 max-w-[80%] mx-auto mt-8">
      <div className="w-full mt-3 flex gap-10 px-16">
        <div className="w-[30%] gap-8 mr-10">
          <h2 className="m-2 text-lg">Account</h2>
          <section className="shadow-md border border-gray-200 px-6 py-4 mb-8">
            <ul className="text-sm">
              <li className="py-1 border-b border-gray-400">Profile</li>
              <li className="py-1 border-b border-gray-400">Security</li>
              <li className="py-1 border-b border-gray-400">Privacy</li>
              <li className="py-1 text-red-600">Delete account</li>
            </ul>
          </section>
          
          <h2 className="m-2 text-lg">App settings</h2>
          <section className="shadow-md border border-gray-200 px-6 py-4">
            <ul className="text-sm">
              <li className="py-1 border-b border-gray-400">Dashboard</li>
              <li className="py-1 border-b border-gray-400">Notifications</li>
              <li className="py-1 border-b border-gray-400">Customization</li>
              <li className="py-1 text-blue-600">View All</li>
            </ul>
          </section>
        </div>

        <div className="flex-1">
         <h2 className="m-2 text-lg">Profile</h2>
         <section className="shadow-md border border-gray-200 px-30 py-30">
           <div className="flex">
             <div className="space-y-6 text-sm mr-20">
               <div className="flex items-center gap-10">
                 <span className="w-24">Username</span>
                 <div className="w-48 h-7 bg-gray-300 px-2 flex items-center">
                 </div>
                </div>
                <div className="flex items-center gap-10">
                  <span className="w-24">First name</span>
                  <div className="w-48 h-7 bg-gray-300 px-2 flex items-center">
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <span className="w-24">Lastname</span>
                  <div className="w-48 h-7 bg-gray-300" />
                </div>
            </div>
              <div className="ml-auto flex flex-col items-center justify-center gap-3">
                <div className="w-48 h-36 rounded-[40px] overflow-hidden bg-gray-200">
                  <img
                    src="#"
                  />
                </div>
                <button className="text-sm text-blue-600">
                  Change profile picture
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

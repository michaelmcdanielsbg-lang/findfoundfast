'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('driver');

  const driverSteps = [
    { step: 1, title: "Parking / Drop-off", desc: "Pull into Entrance B – any uncovered spot near the blue sign", url: "https://i.ibb.co/1t4MWkgH/Modern-apartment-at-dusk.png" },
    { step: 2, title: "Main Entrance", desc: "Gate code: G7K42 – use the keypad on the left side of the door", url: "https://i.ibb.co/BV8fW6pn/Modern-apartment-entrance-at-dusk.png" },
    { step: 3, title: "Lobby → Elevator", desc: "Go straight past the mailboxes, elevator is on the left", url: "https://i.ibb.co/dwCQrWmf/Modern-residential-lobby-with-cozy-elegance.png" },
    { step: 4, title: "Your Door", desc: "Unit 412 – last door on the right. Leave at door. Thank you!", url: "https://i.ibb.co/0VWt3QZk/Modern-elevator-in-sleek-lobby-setting.png" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <div className="pt-20 pb-16 text-center border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-5 py-2 rounded-full text-sm font-medium mb-6">
            🚀 FFFLIPING COOL • NO APP REQUIRED
          </div>
          <h1 className="text-6xl font-bold leading-tight mb-6">
            Never text <span className="text-emerald-400">&quot;where are you?&quot;</span> again
          </h1>
          <p className="text-2xl text-zinc-400">One link per building. Crystal-clear photos. Codes that vanish automatically.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button type="button" onClick={() => setActiveTab('manager')} className={`px-8 py-4 rounded-3xl font-semibold text-lg transition ${activeTab === 'manager' ? 'bg-emerald-500 text-black' : 'bg-zinc-900 hover:bg-zinc-800'}`}>🏢 Property Manager</button>
          <button type="button" onClick={() => setActiveTab('resident')} className={`px-8 py-4 rounded-3xl font-semibold text-lg transition ${activeTab === 'resident' ? 'bg-emerald-500 text-black' : 'bg-zinc-900 hover:bg-zinc-800'}`}>🏠 Resident Routes</button>
          <button type="button" onClick={() => setActiveTab('driver')} className={`px-8 py-4 rounded-3xl font-semibold text-lg transition ${activeTab === 'driver' ? 'bg-emerald-500 text-black' : 'bg-zinc-900 hover:bg-zinc-800'}`}>🚗 Driver View</button>
        </div>

        {/* PROPERTY MANAGER (unchanged) */}
        {activeTab === 'manager' && (
          <div className="bg-zinc-900 rounded-3xl p-10">
            <h2 className="text-4xl font-bold mb-6">Property Manager Instructions</h2>
            <p className="text-zinc-400 mb-10">Set up once per building. Every resident inherits the guide automatically.</p>
            <div className="space-y-12">
              <div className="bg-zinc-800 rounded-2xl p-8">
                <h3 className="font-semibold text-2xl mb-3">1. Add your building</h3>
                <p className="text-emerald-400 text-xl">Building A, Building B, North Tower, Tower 3, etc.</p>
                <p className="text-zinc-400 mt-2">Label it however you want</p>
              </div>
              <div className="bg-zinc-800 rounded-2xl p-8">
                <h3 className="font-semibold text-2xl mb-4">2. Take 4 base photos</h3>
                <p className="text-emerald-400 text-xl mb-8">Parking → Entrance → Lobby → Elevator</p>
                <p className="text-zinc-400 mb-8">Optional: draw arrows (← → ↑ ↓) on any photo</p>
                <div className="grid grid-cols-2 gap-6">
                  {driverSteps.map((photo) => (
                    <div key={photo.step} className="group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photo.url} alt={photo.title} className="w-full h-64 object-cover rounded-2xl border border-zinc-700 shadow-lg transition group-hover:scale-105" />
                      <p className="mt-4 text-center text-emerald-400 font-medium text-lg">{photo.title}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-12 bg-zinc-900 rounded-2xl p-8 text-center">
                  <p className="text-zinc-400 text-2xl leading-tight">
                    One link per building = every unit in that building.<br />
                    Updates instantly reflect on every resident&apos;s link.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESIDENT ROUTES - Updated with new timers + new Generated Link preview */}
        {activeTab === 'resident' && (
          <div className="bg-zinc-900 rounded-3xl p-10">
            <h2 className="text-4xl font-bold mb-6">Resident Routes</h2>
            <p className="text-zinc-400 mb-10">Your property manager gives you a 5-character code when they set up the building.</p>

            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {/* How you get your link */}
              <div className="bg-zinc-800 rounded-3xl p-8 flex flex-col">
                <div className="text-5xl mb-6">🔑</div>
                <h3 className="text-2xl font-semibold mb-6">How you get your link</h3>
                <ol className="text-left text-zinc-400 space-y-6 text-lg flex-1">
                  <li><span className="font-medium text-emerald-400">1.</span> Log in with the 5-character code from your property manager</li>
                  <li><span className="font-medium text-emerald-400">2.</span> Select your building</li>
                  <li><span className="font-medium text-emerald-400">3.</span> Type your unit number</li>
                  <li><span className="font-medium text-emerald-400">4.</span> Pick 30 minutes / 1 hour / 1 day → hit Copy</li>
                </ol>
              </div>

              {/* From this / To this */}
              <div className="md:col-span-2 grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <div className="text-red-400 text-sm font-medium mb-3">FROM THIS...</div>
                  <div className="bg-white rounded-3xl p-5 flex-1 flex flex-col gap-4 text-zinc-900">
                    <div className="text-xs text-zinc-400">DRIVER TO RESIDENT</div>
                    <div className="bg-zinc-200 rounded-2xl px-4 py-3 text-sm max-w-[80%]">I&apos;m here, how do I get in?</div>
                    <div className="bg-zinc-200 rounded-2xl px-4 py-3 text-sm max-w-[80%]">No code? I can&apos;t access the building</div>
                    <div className="bg-emerald-400 text-white rounded-2xl px-4 py-3 text-sm max-w-[80%] self-end">Go to the second entrance, turn left at the—</div>
                    <div className="bg-zinc-200 rounded-2xl px-4 py-3 text-sm max-w-[80%]">Order cancelled. Sorry.</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-emerald-400 text-sm font-medium mb-3">TO THIS...</div>
                  <div className="bg-white rounded-3xl p-5 flex-1 flex flex-col gap-4 text-zinc-900">
                    <div className="text-xs text-zinc-400">DRIVER TO RESIDENT</div>
                    <div className="bg-zinc-200 rounded-2xl px-4 py-3 text-sm max-w-[80%]">On the way</div>
                    <div className="bg-emerald-400 text-white rounded-2xl px-4 py-3 text-sm max-w-[80%] self-end">Here are the instructions, click link:</div>
                    <div className="bg-white border border-zinc-200 rounded-2xl p-3 text-xs">
                      <div className="font-semibold text-emerald-400">FindFoundFast</div>
                      <div className="text-zinc-900">Sunny Apartments - Building A</div>
                      <div className="text-emerald-500 text-[10px]">Expires in 42 min • Step-by-step photos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* NEW SECTION - What your generated link looks like */}
            <div className="mt-16">
              <h3 className="text-2xl font-semibold mb-6 text-center">What your generated link looks like</h3>
              <div className="max-w-md mx-auto bg-zinc-800 rounded-3xl p-8 text-center border border-zinc-700">
                <div className="text-emerald-400 font-medium mb-1">findfoundfast.com/link/sunny-a</div>
                <div className="text-3xl font-bold text-white mb-4">Expires in <span className="text-emerald-400">42 minutes</span></div>
                <div className="bg-emerald-500 text-black font-semibold py-4 rounded-2xl text-xl mb-6">COPY LINK</div>
                <p className="text-zinc-400 text-sm">Send this link to your driver or guest. They&apos;ll see the exact step-by-step photos and gate code.</p>
              </div>
            </div>
          </div>
        )}

        {/* DRIVER VIEW */}
        {activeTab === 'driver' && (
          <div className="bg-zinc-900 rounded-3xl p-10">
            <h2 className="text-4xl font-bold mb-8 text-center">Driver View – What they actually see</h2>
            <div className="max-w-2xl mx-auto bg-black rounded-3xl overflow-hidden">
              <div className="bg-zinc-950 p-6 flex justify-between items-center border-b border-zinc-800">
                <span className="text-emerald-400 font-bold text-xl">FindFoundFast</span>
                <span className="text-emerald-400 font-medium">Expires in 42 min</span>
              </div>
              <div className="p-8 space-y-10">
                {driverSteps.map((photo) => (
                  <div key={photo.step} className="bg-zinc-800 rounded-2xl p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.url} alt={photo.title} className="w-full h-80 object-cover rounded-xl mb-4" />
                    <div className="flex gap-4">
                      <div className="bg-emerald-500 text-black w-8 h-8 rounded-2xl flex items-center justify-center font-bold flex-shrink-0">{photo.step}</div>
                      <div>
                        <div className="font-semibold text-lg">{photo.title}</div>
                        <div className="text-zinc-400">{photo.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-red-900/30 text-red-400 text-center py-6 font-medium">
                Timer ends → codes disappear → link dies. No stale screenshots.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Final CTA */}
      <div className="py-24 text-center bg-zinc-950">
        <h2 className="text-4xl font-bold mb-6">Ready to make arrivals Flipping Cool for your property?</h2>
        <Link href="https://findfoundfast-final.vercel.app" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-black px-12 py-5 rounded-3xl font-semibold text-xl">
          Request a Free Demo
        </Link>
      </div>
    </div>
  );
}

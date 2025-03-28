'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function MainPage() {
  const [activeTab, setActiveTab] = useState('builder');

  return (
    <div className="min-h-screen flex bg-[#1a1a1a] text-white font-sans">
      {/* Removed macOS-style window controls and App Title as requested */}

      {/* Sidebar */}
      <div className="fixed left-5 top-0 h-screen flex items-center z-40">
        <div className="w-[60px] bg-[#2a2a2a]/80 backdrop-blur-xl text-white rounded-xl shadow-xl border border-[#3a3a3a] h-[calc(100vh-80px)] flex flex-col items-center py-6">
          <div className="space-y-8 flex flex-col items-center">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#3a3a3a] transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#3a3a3a] transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#3a3a3a] transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#3a3a3a] transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          
          {/* Profile Image - Added at the bottom */}
          <div className="mt-auto flex justify-center items-center w-full pb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 flex items-center justify-center overflow-hidden border-2 border-[#3a3a3a] hover:border-[#707070] transition-all duration-300 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[80px] p-8 flex items-center">
        <div className="bg-[#2a2a2a]/80 backdrop-blur-xl rounded-xl border border-[#3a3a3a] shadow-xl h-[calc(100vh-80px)] overflow-hidden w-full">
          {/**/}

          {/* Content Area */}
          <div className="p-6">
            {activeTab === 'builder' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-2">TEXT</h2>
                  <p className="text-gray-400 text-sm">TEXT</p>
                </div>

                {/* Tip Box */}
                <div className="bg-[#3a3a3a]/50 backdrop-blur-sm rounded-lg p-4 mb-8 border border-[#4a4a4a]">
                  <div className="flex items-start">
                    <div className="text-gray-400 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">TEXT</p>
                    </div>
                    <button className="ml-auto text-gray-500 hover:text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Project Card */}
                <Link href="/pages/chat" className="block">
                  <div className="bg-[#3a3a3a]/30 backdrop-blur-sm rounded-lg p-6 border border-[#4a4a4a] hover:border-[#5a5a5a] transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-[#4a4a4a] p-2 rounded mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">ChatBots</h3>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Gemini 2 Flash
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}




            {activeTab === 'chat' && (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-400">Chat interface would appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
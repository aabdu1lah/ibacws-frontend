import React from "react";
import Button from "./Button.jsx";
import generateBanner from "../BannerGenerator";

const Banner = ({
                    userInfo,
                    handleFileChange,
                    getInitials,
                    preview,
                    setDownloaded,
                    handleAccept,
                    uploading
                }) => {
    if (!userInfo) return null;

    return (
        <div className="flex flex-col items-center">
            <div
                id="banner"
                className="relative w-[640px] h-[320px] rounded-2xl overflow-hidden shadow-2xl"
            >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2a2b4b] via-[#3a3c64] to-[#ff8dc7]" />
                <div className="absolute -top-12 -left-12 w-56 h-56 rounded-full bg-[#ffb1df]/40 blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-[#ff8dc7]/30 blur-3xl" />

                {/* Content layout */}
                <div className="relative z-10 flex items-center h-full px-10 text-white gap-x-8">
                    {preview ? (
                        <div
                            className="w-36 h-36 rounded-full overflow-hidden border-4 border-white/30 shadow-lg flex-shrink-0">
                            <img
                                src={preview}
                                alt={userInfo.name}
                                className="w-full h-full object-cover"
                                crossOrigin="anonymous"
                                style={{imageRendering: "auto"}}
                            />
                        </div>
                    ) : (
                        <div
                            className="w-36 h-36 rounded-full bg-black flex items-center justify-center border-4 border-white/30 shadow-lg">
                            <span className="text-2xl font-bold text-white">
                                {getInitials(userInfo.name)}
                            </span>
                        </div>
                    )}

                    <div className="flex flex-col justify-center max-w-md text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-2">{userInfo.name}</h2>
                        <p className="text-xl font-medium mb-2
                                      bg-clip-text">
                            {userInfo.position} {userInfo.position === 'Executive Council' && (' - ' + userInfo.department)} | IBA CWS
                        </p>
                        {userInfo.tagline && (
                            <p className="italic text-sm text-gray-200">{userInfo.tagline}</p>
                        )}
                    </div>

                </div>
            </div>

            <label className="mt-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <span
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg cursor-pointer hover:bg-gray-700 transition">
                    Choose Image
                </span>
            </label>

            <div className="mt-6 flex gap-4">
                <Button
                    onClick={() => generateBanner(userInfo, () => setDownloaded(true))}
                >
                    Download Banner
                </Button>

                <Button
                    onClick={handleAccept}
                    disabled={uploading} // disable while uploading
                >
                    {uploading ? (
                        <div className="flex items-center gap-2">
                            <span className="loader w-4 h-4 border-2 border-t-white border-r-white rounded-full animate-spin"></span>
                            Uploading...
                        </div>
                    ) : (
                        "Continue"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default Banner;

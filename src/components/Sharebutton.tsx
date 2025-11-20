"use client";
import { useState } from "react";

export default function ShareButtons({ title, blogId }) {
    const [copied, setCopied] = useState(false);
    const [showShareOptions, setShowShareOptions] = useState(false);

    const blogUrl =
        typeof window !== "undefined"
            ? `${window.location.origin}/blog/${blogId}`
            : "";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(blogUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="relative">
            {/* Share button */}
            <button
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="cursor-pointer relative p-2 rounded-full bg-blue-50 hover:bg-blue-100"
            >
                <ShareIcon />
            </button>

            {/* SHARE OPTIONS – HIDE/SHOW */}
            {showShareOptions && (
                <div className="absolute right-0 mt-4 flex gap-4 animate-fadeIn">
                    
                    {/* WhatsApp */}
                    <a
                        href={`https://wa.me/?text=${encodeURIComponent(
                            title + " " + blogUrl
                        )}`}
                        target="_blank"
                        className="share-btn whatsapp"
                    >
                        <WhatsAppIcon />
                    </a>

                    {/* Twitter */}
                    <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            title
                        )}&url=${blogUrl}`}
                        target="_blank"
                        className="share-btn twitter"
                    >
                        <TwitterIcon />
                    </a>

                    {/* LinkedIn */}
                    <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${blogUrl}`}
                        target="_blank"
                        className="share-btn linkedin"
                    >
                        <LinkedinIcon />
                    </a>

                    {/* Copy */}
                    <button onClick={copyToClipboard} className="share-btn copy">
                        {copied ? <span>✔</span> : <CopyIcon />}
                    </button>
                </div>
            )}

            {/* Styles */}
            <style jsx>{`
        .share-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: #f1f1f1;
          transition: 0.2s;
        }

        .share-btn:hover {
          transform: scale(1.1);
          background: #e5e5e5;
        }

        .whatsapp { color: #25d366; }
        .twitter { color: #1da1f2; }
        .linkedin { color: #0077b5; }
        .copy { color: #333; }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}

/* SVG ICONS */
function WhatsAppIcon() {
    return (
        <svg width="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.5 14.3c-.3-.2-1.8-.9-2.1-.9-.3 0-.5-.1-.7.3-.2.3-.8.9-.9 1-.2.1-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.7-1-1-1.7-2.1-1.9-2.4-.2-.3 0-.5.2-.7.2-.2.3-.3.5-.5.2-.2.3-.3.5-.5.2-.3.1-.5 0-.7-.1-.2-.7-1.7-.9-2.2-.2-.5-.4-.4-.7-.4h-.6c-.3 0-.7.1-1 .5-.3.3-1.3 1.2-1.3 3 0 1.8 1.3 3.5 1.4 3.7.2.2 2.6 4 6.4 5.5 3.8 1.5 3.8 1 4.5 1 0 0 1.5-.6 1.7-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.4z" />
        </svg>
    );
}

function TwitterIcon() {
    return (
        <svg width="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.6 8.6 0 01-2.72 1.04 4.28 4.28 0 00-7.4 2.92c0 .34.04.67.11.98A12.1 12.1 0 013 4.79a4.27 4.27 0 001.32 5.71 4.22 4.22 0 01-1.94-.54v.05a4.28 4.28 0 003.44 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.97A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.7 8.7 0 0022.46 6z" />
        </svg>
    );
}

function LinkedinIcon() {
    return (
        <svg width="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3A2 2 0 0121 5V19A2 2 0 0119 21H5A2 2 0 013 19V5A2 2 0 015 3H19M8 17V10H5V17H8M6.5 9A1.5 1.5 0 106.5 6 1.5 1.5 0 006.5 9M19 17V13.5C19 11 17.5 10 15.9 10A3.3 3.3 0 0013 11.6V10H10V17H13V13.8C13 12.5 13.7 11.7 14.8 11.7C15.8 11.7 16.3 12.4 16.3 13.8V17H19Z" />
        </svg>
    );
}

function CopyIcon() {
    return (
        <svg width="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H8A2 2 0 006 5V17H8V5H19V3M16 7H11A2 2 0 009 9V21A2 2 0 0011 23H16A2 2 0 0018 21V9A2 2 0 0016 7M11 21V9H16V21H11Z" />
        </svg>
    );
}

function ShareIcon() {
    return (
        <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24">
            <path stroke="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92"></path>
        </svg>
    );
}

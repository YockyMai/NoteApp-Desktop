import Image from "next/image";
import logo from "../public/images/logo.svg";
import React from "react";
import Link from "next/link";


const Logo = () => {
    return (
        <div className="logo">
            <Link href="/notes">
                <a className="logoImage">
                    <Image src={logo}/>
                    <h2>
                        Notes
                    </h2>
                    <span className="logoImage-underline">
                        <svg width="194" height="14" viewBox="0 0 194 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_26_255)">
                                <line x1="7" y1="2" x2="186.003" y2="2" stroke="#80CBC4" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 10"/>
                            </g>
                            <defs>
                                <filter id="filter0_d_26_255" x="0" y="0" width="193.003" height="14" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset dy="5"/>
                                    <feGaussianBlur stdDeviation="2.5"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_26_255"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_26_255" result="shape"/>
                                </filter>
                            </defs>
                        </svg>
                    </span>
                </a>
            </Link>
        </div>
    );
};

export default Logo;



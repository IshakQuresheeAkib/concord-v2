import type { JSX } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import concordLogo from '@/assets/Concord.png'
import SubscribeForm from './SubscribeForm'
import './footer.css'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Biodatas', href: '/biodatas' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'About Us', href: '/about-us' },
] as const

export default function Footer(): JSX.Element {
  return (
    <div className="relative footer-bg mt-40 min-h-[70vh]">

      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          />
        </svg>
      </div>

      <div className="xl:pt-28 pt-16 pb-5 px-3 sm:px-0 mx-auto flex flex-col justify-center h-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl 2xl:max-w-7xl text-white">

        <div className="flex md:flex-row flex-col md:gap-32 2xl:gap-72 mb-8">

          <div className="md:max-w-lg">
            <Image
              src={concordLogo}
              alt="Concord"
              className="w-52 h-auto mt-2 md:-ml-10 -ml-5"
            />
            <div className="mt-4">
              <p className="text-xs mb-4">
                Join Concord today and explore the beauty of relationships as you navigate through
                a space that celebrates the simplicity and warmth of genuine connections.
              </p>
              <strong>Subscribe for Updates</strong>
              <SubscribeForm />
            </div>
          </div>

          <div>
            <nav className="flex flex-col gap-5 mt-6 w-24 text-white/80">
              <h2 className="font-bold text-white">Explore</h2>
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="hover:text-white duration-300"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        <div className="flex flex-col justify-between pt-5 pb-0 border-t border-white/20 sm:flex-row">
          <p className="text-sm text-gray-100">
            © Copyright 2020 Concord Ltd. All rights reserved.
          </p>

          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <Link href="/" aria-label="Twitter">
              <FaTwitter className="h-5 w-5 transition-colors duration-300 text-white/70 hover:text-white" />
            </Link>
            <Link href="/" aria-label="Instagram" className="transition-colors duration-300 text-white/70 hover:text-white">
             <FaInstagram className="h-5 w-5" />
            </Link>
            <Link href="/" aria-label="Facebook" className="transition-colors duration-300 text-white/70 hover:text-white"
            >
              <FaFacebook className="h-5 w-5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

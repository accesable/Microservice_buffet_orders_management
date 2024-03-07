import React from 'react'
import { Link } from 'react-router-dom'
import { Footer } from 'flowbite-react'
import { BsFacebook,BsInstagram,BsTwitterX,BsGithub } from 'react-icons/bs'
function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                <div className="mt-5">
                <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-red-600 via-red-300 to-orange-400 rounded-lg text-white'>Hadilao's</span>
            HotPot
        </Link>
            </div>
                <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3
                sm:gap-6">
                    <div className="">
                    <Footer.Title title='About' />
                    <Footer.LinkGroup col>
                        <Footer.Link href=''
                        target='_blank'
                        rel='noopener noreferrer'>
                            Hadilao
                        </Footer.Link>
                        <Footer.Link href='/about'
                        target='_blank'
                        rel='noopener noreferrer'>
                            Tran Nhut Anh
                        </Footer.Link>
                        
                    </Footer.LinkGroup>
                    </div>
                    <div className="">
                        <Footer.Title title='Follow Me' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='#'
                            target='_blank'
                            rel='noopener noreferrer'>
                                Hadilao
                            </Footer.Link>
                            <Footer.Link href='#'
                            target='_blank'
                            rel='noopener noreferrer'>
                                Tran Nhut Anh
                            </Footer.Link>
                            
                        </Footer.LinkGroup>
                    </div>
                    <div className="">
                        <Footer.Title title='Follow Me' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='#'
                            target='_blank'
                            rel='noopener noreferrer'>
                                Hadilao
                            </Footer.Link>
                            <Footer.Link href='#'
                            target='_blank'
                            rel='noopener noreferrer'>
                                Tran Nhut Anh
                            </Footer.Link>
                            
                        </Footer.LinkGroup>
                    </div>
                    <div className="">
                        <Footer.Title title='Follow Me' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='#'
                            target='_blank'
                            rel='noopener noreferrer'>
                                Hadilao
                            </Footer.Link>
                            <Footer.Link href='#'
                            target='_blank'
                            rel='noopener noreferrer'>
                                Tran Nhut Anh
                            </Footer.Link>
                            
                        </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider />
            <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright href='#' by='Tran Nhut Anh' year={new Date().getFullYear()} 
                />
                <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                    <Footer.Icon href='#' icon={BsFacebook}/>
                    <Footer.Icon href='#' icon={BsGithub}/>
                    <Footer.Icon href='#' icon={BsInstagram}/>
                </div>
            </div>
        </div>
    </Footer>
  )
}

export default FooterCom
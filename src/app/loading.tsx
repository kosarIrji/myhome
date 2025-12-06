import Image from 'next/image'

function loading() {
    return (
        <>
            <div
                className="grid place-items-center px-6 py-24 sm:py-32 lg:px-8 min-h-screen"
                style={{
                    backgroundImage:
                        "url('/images/general/Loading.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                }}
            >
                <div className="flex flex-col gap-10 animate-pulse justify-center items-center">
                    <Image
                        src={'/images/logoWhite.png'}
                        alt={'logo image'}
                        width={160}
                        height={160}
                        className='mx-auto'
                    />
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance text-white">
                        در حال بارگیری ...
                    </h2>
                    <p className='text-xl'>
                        لطفا منتظر بمانید
                    </p>

                    <span className="loading loading-bars loading-xl mx-auto"></span>
                </div>
            </div>
        </>
    )
}

export default loading
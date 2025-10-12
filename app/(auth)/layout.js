export default function layout({children}) {
    return <div className="h-full flex items-center justify-center">
        <div className="max-w-screen-md w-full ">
            {children}
        </div>
        </div>
}

 
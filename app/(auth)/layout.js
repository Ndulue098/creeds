export default function layout({children}) {
    return <div className="h-screen flex items-center justify-center">
        <div className="sm:max-w-screen-md w-full mx-3 max-w-xs ">
            {children}
        </div>
        </div>
}

 
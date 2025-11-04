export default function APIStatusCard({apiStatus}) {
    return (
        <>
            {apiStatus?.success === true ? (
                <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 text-center">
                    {apiStatus?.message}
                </div>
            ) : apiStatus?.success === false ? (
                <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4 text-center">
                    {apiStatus?.message}
                </div>
            ) : null}
        </>
    )
}
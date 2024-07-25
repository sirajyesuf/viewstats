import { useState } from 'react'

function App() {
  const [v1,setV1] = useState('')
  const [v2,setV2] = useState('')

  async function getVedioDetail(videoId){
    
      const url = new URL('https://youtube.googleapis.com/youtube/v3/videos');
      url.searchParams.append('part','statistics');
            // url.searchParams.append('part', 'snippet,contentDetails,statistics');
      url.searchParams.append('id', videoId);
      url.searchParams.append('key',"AIzaSyAJ_cBZSmElM_7hPCW_3DVFmPBl9mYhe9U");
      const headers = new Headers();
      headers.append('Accept', 'application/json');

     const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });

      console.log(await response.json())

  }

  function setVideo1(v1){
    setV1(v1)
    getVedioDetail(v1)
  }

  function setVideo2(v2){
    setV2(v2)
    getVedioDetail(v2)

  }

  return (
    <div className="bg-white h-full w-3/4 mx-auto mt-20 flex flex-col gap-8">
      <div className="border-2 border-[#eff1f3] rounded-md p-4 flex justify-around items-center gap-3">

        <div className="w-2/4">
        <input type="text" value={v1} className="bg-[#f1f3f4] p-4 rounded-full w-full"
        onChange={ e => setVideo1(e.target.value)}
        />
        </div>

        <p className="font-normal text-[#383838]">VS</p>

        <div className="w-2/4">
        <input type="text"  value={v2} className="bg-[#f1f3f4] p-4 rounded-full w-full" 
        onChange={e => setVideo2(e.target.value)}
        />
        </div>

      </div>

      <div className="border-2 p-4">
        {v1}
        vs
        {v2}
      </div>
    </div>
  )
}

export default App

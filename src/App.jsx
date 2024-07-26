import { useState } from 'react'
// import defaultVideos from './db/videos'

function App() {
  const [v1,setV1] = useState('')
  const [v2,setV2] = useState('')
  const [v1Detail,setV1Detail] = useState('')
  const [v2Detail,setV2Detail] = useState('')

  // useEffect(()  =>  {

  //   let dv = defaultVideos();

  //   dv.forEach(async function(index,value){
  //     if(index == 0 ){

  //       setV1(value)
  //       let r = await getVedioDetail2(value)
  //       setV1Detail(r)
  //     }
  //     if(index == 1){
  //       setV2(value)
  //       let r = await getVedioDetail2(value)
  //       setV2Detail(r)
  //     }
  //   });

  //   async function getVedioDetail2(videoId){

  //     const url = new URL('https://youtube.googleapis.com/youtube/v3/videos');
  //     url.searchParams.append('part', 'snippet,statistics');
  //     url.searchParams.append('id', videoId);
  //     url.searchParams.append('key',"AIzaSyAJ_cBZSmElM_7hPCW_3DVFmPBl9mYhe9U");
  //     const headers = new Headers();
  //     headers.append('Accept', 'application/json');
  
  //    const response = await fetch(url, {
  //       method: 'GET',
  //       headers: headers
  //     });
  
  //     return await response.json();
  //   }



  // }, []);



  async function getVedioDetail(videoId,isvideo1=true){

      const url = new URL('https://youtube.googleapis.com/youtube/v3/videos');
      // url.searchParams.append('part','statistics');
            url.searchParams.append('part', 'snippet,statistics');
      url.searchParams.append('id', videoId);
      url.searchParams.append('key',"AIzaSyAJ_cBZSmElM_7hPCW_3DVFmPBl9mYhe9U");
      const headers = new Headers();
      headers.append('Accept', 'application/json');

     const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });

    const result = await response.json();

    if(isvideo1 == true){
      setV1Detail(result)
    }
    else{
      setV2Detail(result)
    }

  }

  function setVideo1(v1){
    setV1(v1)
    getVedioDetail(v1)
  }

  function setVideo2(v2){
    setV2(v2)
    getVedioDetail(v2,false)

  }

  return (
    <>
    <div className='flex justify-between items-center px-12 py-2 bg-white'>
      <div className='w-10 h-10'>
        <a href="/" className='flex items-center gap-2'>
          <img src="./public/yt.png"/>
          <p className='font-bold font-capitalize text-black'>VideoVersus</p>
        </a>
      </div>
    </div>
    <div className="bg-[#fafcff] min-h-screen mx-auto mt-8 flex flex-col gap-8 font-black px-28 py-8">

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

      <div className="p-4 min-h-full">

        <div className="flex gap-8 p-4 border-none h-full">

        { v1 != '' & v1Detail != '' && (


                <div className='border-2 border-[#ff0000] rounded-lg p-4 w-2/4'>
                  <div className='p-2 flex gap-2 items-center'>
                      <div className='border-4 border-[#ff0000] rounded-lg self-stretch'></div>
                      <div className=''>
                        <img src={v1Detail.items[0].snippet.thumbnails.high.url} alt="" className='w-full h-full rounded-lg' />
                      </div>
                      <div className='text-capital font-bold'>
                        {v1Detail.items[0].snippet.title}
                      </div>
                  </div>

                  <div className='flex justify-around'>

                    <div className='flex flex-col items-center'>
                      <p>Total View</p>
                      <p>
                        {v1Detail.items[0].statistics.viewCount}
                      </p>
                    </div>

                    <div className='flex flex-col items-center'>
                      <p>likes</p>
                      <p>
                        {v1Detail.items[0].statistics.likeCount}
                      </p>
                    </div>

                    <div className='flex flex-col items-center'>
                      <p>comment</p>
                      <p>
                        {v1Detail.items[0].statistics.commentCount}
                      </p>
                    </div>

                  </div>

                </div>
          )}

          { v2 !='' & v2Detail != '' && (

          <div className='border-2 border-[#0047ff] rounded-lg p-4 w-2/4'>
          <div className='p-2 flex gap-2 items-center'>
              <div className='border-4 border-[#0047ff] rounded-lg self-stretch'></div>
              <div className=''>
              <img src={v2Detail.items[0].snippet.thumbnails.high.url} alt="" className='w-full h-full rounded-lg' />
              </div>
              <div className=''>
              {v2Detail.items[0].snippet.title}
              </div>
          </div>
            
            <div className='flex justify-around'>

            <div className='flex flex-col items-center'>
              <p>Total View</p>
              <p>
                {v2Detail.items[0].statistics.viewCount}
              </p>
            </div>

            <div className='flex flex-col items-center'>
              <p>likes</p>
              <p>
                {v2Detail.items[0].statistics.likeCount}
              </p>
            </div>

            <div className='flex flex-col items-center'>
              <p>comment</p>
              <p>
                {v2Detail.items[0].statistics.commentCount}
              </p>
            </div>

            </div>

          </div>
        )}

</div>





      </div>
    </div>
  
  </>
  )
}

export default App

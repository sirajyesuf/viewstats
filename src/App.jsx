import { useState } from 'react'
import logoPath from "../public/yt.png"
function App() {

  const [v1,setV1] = useState({
    id: 'youtube video url',
    title: 'title here',
    views: '0',
    likes: '0',
    thumbnail_url: ''
  })

  const [v2,setV2] = useState({
    id: 'youtube video url',
    title: 'title here',
    views: '0',
    likes: '0',
    thumbnail_url: '0'
})



async function setVideo1(videoId){

    getVedioDetail(videoId).then((data) => {
      setV1(data)
    })
}

async function setVideo2(videoId){
    getVedioDetail(videoId).then((data) => {
      setV2(data)
    })
}

function extractVideoId(input) {
  // Regular expression to check if the input is a valid YouTube video ID
  const videoIdRegex = /^[a-zA-Z0-9_-]{11}$/;

  // If the input matches the video ID pattern, return it as is
  if (videoIdRegex.test(input)) {
    return input;
  }

  // Regular expression to match various YouTube URL formats
  const urlRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?/;

  // Try to match the input with URL patterns
  const match = input.match(urlRegex);
  return match ? match[1] : null;

}

async function getVedioDetail(videoId){

      const vid = extractVideoId(videoId)
      const key = import.meta.env.VITE_YOUTUBE_API_KEY

      const url = new URL('https://youtube.googleapis.com/youtube/v3/videos');
      url.searchParams.append('part', 'snippet,statistics');
      url.searchParams.append('id', vid);
      url.searchParams.append('key',key);
      const headers = new Headers();
      headers.append('Accept', 'application/json');

      const response = await fetch(url, {
      method: 'GET',
      headers: headers
      });


      const result = await response.json();
      console.log(result)
      if(result.items.length > 0 ){

        return {
          id: videoId,
          title: result.items[0].snippet.title,
          views: result.items[0].statistics.viewCount,
          likes: result.items[0].statistics.likeCount ?? 0,
          comment: result.items[0].statistics.commentCount,
          thumbnail_url: result.items[0].snippet.thumbnails.high.url
        }

      }else {
        return {
          id: videoId,
          title: 'Video not found',
          views: 0,
          likes: 0,
          comment: 0,
          thumbnail_url: ''
        }
      }


}

  return (
    <>
    <div className='flex justify-between items-center px-12 py-2 bg-[#faf9fd]'>
      <div className='w-10 h-10'>
        <a href="/" className='flex items-center gap-2'>
          <img src={logoPath}/>
          <p className='font-bold font-capitalize text-black'>VideoVersus</p>
        </a>
      </div>
    </div>

    <div className="min-h-screen mx-auto mt-8 flex flex-col gap-8 font-black px-2 py-2 md:px-28 md:py-8">

      <div className="flex flex-col md:flex-row rounded-md p-4 justify-around items-center gap-3">

        <div className="w-full md:w-2/4">
        <input type="text" value={v1.id} className="bg-[#f1f3f4] p-4 rounded-full w-full"
        onChange={ e => setVideo1(e.target.value)}
        />
        </div>

        <p className="text-white border-2 border-[#ff0000] rounded-full p-2 bg-[#ff0000] flex items-center">VS</p>

        <div className="w-full md:w-2/4">
        <input type="text"  value={v2.id} className="bg-[#f1f3f4] p-4 rounded-full w-full" 
        onChange={e => setVideo2(e.target.value)}
        />
        </div>

      </div>

      <div className="md:p-4 min-h-full">

        <div className="flex flex-col md:flex-row gap-8 md:p-4 border-none h-full">

        { v1.id  && (


                <div className='border-2 border-[#ff0000] rounded-lg p-4 w-full md:w-2/4 flex flex-col'>
                  
                  <div className='p-2 flex flex-col md:flex-row gap-4'>

                    <div className='flex gap-4 w-full md:w-1/4'>

                      <div className='border-8 border-[#ff0000] rounded-lg'></div>

                      <div className='md:w-40 md:h-40'>
                        <img src={v1.thumbnail_url} alt="" className='w-full h-full rounded-lg object-cover' />
                      </div>

                    </div>

                    <div className='font-extrabold py-8 text-3xl w-3/4 self-center break-all'>{v1.title}</div>

                  </div>

                  <div className='flex justify-evenly py-4'>

                    <div className='flex flex-col items-center'>
                      <p className='font-bold text-xl'>Total View</p>
                      <p>{v1.views}</p>
                    </div>

                    <div className='flex flex-col items-center'>
                      <p className='font-bold text-xl'>Likes</p>
                      <p>{v1.likes}</p>
                    </div>

                    <div className='flex flex-col items-center'>
                      <p className='font-bold text-xl'>Comment</p>
                      <p>{v1.comment}</p>
                    </div>

                  </div>

                </div>
          )}

          { v2.id  && (

          <div className='border-2 border-[#0047ff] rounded-lg p-4 w-full md:w-2/4 flex flex-col justify-between'>

          <div className='p-2 flex flex-col md:flex-row gap-4'>

            <div className='flex gap-4 w-full md:w-1/4'>

              <div className='border-8 border-[#0047ff] rounded-lg self-stretch'></div>

              <div className='md:w-40 md:h-40'>

              <img src={v2.thumbnail_url} alt="" className='w-full h-full rounded-lg object-cover' />
              
              </div>

            </div>

            <div className='font-extrabold py-8 text-3xl w-3/4 self-center break-all'>
            {v2.title}
            </div>

          </div>
            
            <div className='flex justify-evenly py-4'>

            <div className='flex flex-col items-center'>
              <p className='font-bold text-xl'>Total View</p>
              <p>
                {v2.views}
              </p>
            </div>

            <div className='flex flex-col items-center'>
              <p className='font-bold text-xl'>Likes</p>
              <p>
                {v2.likes}
              </p>
            </div>

            <div className='flex flex-col items-center'>
              <p className='font-bold text-xl'>Comment</p>
              <p>
                {v2.comment}
              </p>
            </div>

            </div>

          </div>
        )}

    </div>
    </div>
    </div>

{/* footer */}
<div className='w-80 mx-auto py-2 flex gap-2 capitalize'>

  <p> made with </p>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
  <p>in Addis Ababa</p>

</div>

  </>

  )

}

export default App

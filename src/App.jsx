import { useState } from 'react'

function App() {

  const [v1,setV1] = useState({
    id: '',
    title: '',
    views: '',
    likes: '',
    thumbnail_url: ''
  })

  const [v2,setV2] = useState({
    id: '',
    title: '',
    views: '',
    likes: '',
    thumbnail_url: ''
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
          <img src="./public/yt.png"/>
          <p className='font-bold font-capitalize text-black'>VideoVersus</p>
        </a>
      </div>
    </div>

    <div className="min-h-screen mx-auto mt-8 flex flex-col gap-8 font-black px-28 py-8">

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

                      <div className='border-8 border-[#ff0000] rounded-lg self-stretch'></div>

                      <div className='md:w-40 md:h-40'>
                        <img src={v1.thumbnail_url} alt="" className='w-full h-full rounded-lg object-cover' />
                      </div>

                    </div>

                    <div className='font-extrabold py-8 text-3xl w-3/4 self-center'>{v1.title}</div>

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

            <div className='font-extrabold py-8 text-3xl w-3/4 self-center'>
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

  </>

  )

}

export default App

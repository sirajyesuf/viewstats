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


  async function getVedioDetail(videoId){

        const url = new URL('https://youtube.googleapis.com/youtube/v3/videos');
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

        return {
          id: videoId,
          title: result.items[0].snippet.title,
          views: result.items[0].statistics.viewCount,
          likes: result.items[0].statistics.likeCount,
          comment: result.items[0].statistics.commentCount,
          thumbnail_url: result.items[0].snippet.thumbnails.high.url
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

      <div className="rounded-md p-4 flex justify-around items-center gap-3">

        <div className="w-2/4">
        <input type="text" value={v1.id} className="bg-[#f1f3f4] p-4 rounded-full w-full"
        onChange={ e => setVideo1(e.target.value)}
        />
        </div>

        <p className="text-white border-2 border-[#ff0000] rounded-full p-2 bg-[#ff0000] flex items-center">VS</p>

        <div className="w-2/4">
        <input type="text"  value={v2.id} className="bg-[#f1f3f4] p-4 rounded-full w-full" 
        onChange={e => setVideo2(e.target.value)}
        />
        </div>

      </div>

      <div className="p-4 min-h-full">

        <div className="flex gap-8 p-4 border-none h-full">

        { v1.id  && (


                <div className='border-2 border-[#ff0000] rounded-lg p-4 w-2/4 flex flex-col justify-between'>
                  
                  <div className='p-2 flex gap-4'>

                    <div className='flex gap-4 w-1/4'>

                      <div className='border-8 border-[#ff0000] rounded-lg self-stretch'></div>
                      <div className='w-40 h-40'>
                      <img src={v1.thumbnail_url} alt="" className='w-full h-full rounded-lg object-cover' />
                      </div>

                    </div>

                    <div className='font-extrabold py-8 text-3xl w-3/4'>{v1.title}</div>

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

          <div className='border-2 border-[#0047ff] rounded-lg p-4 w-2/4 flex flex-col justify-between'>

          <div className='p-2 flex gap-4'>

            <div className='flex gap-4 w-1/4'>

              <div className='border-8 border-[#0047ff] rounded-lg self-stretch'></div>
              <div className='w-40 h-40'>
              <img src={v2.thumbnail_url} alt="" className='w-full h-full rounded-lg object-cover' />
              </div>

            </div>

            <div className='font-extrabold py-8 text-3xl w-3/4'>
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

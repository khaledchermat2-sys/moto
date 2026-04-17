import { getPodcasts } from "@/lib/actions/podcasts"
import { getYouTubeEmbedUrl } from "@/lib/utils"
import { Play, Calendar, Clock, Share2 } from "lucide-react"

export default async function PodcastsPage() {
  const podcasts = await getPodcasts()

  return (
    <div style={{ maxWidth: 1280, margin: '60px auto 100px', padding: '0 24px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '80px' }} className="animate-fadeIn">
        <h1 className="text-gradient" style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '20px', letterSpacing: '-2px' }}>
          MOTORCYCLE <span style={{ color: 'var(--green)' }}>PODCAST</span>
        </h1>
        <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
          Plongez dans l'univers de la moto en Algérie. Interviews, nouveautés, et conseils d'experts, le tout en vidéo.
        </p>
      </div>

      {podcasts.length === 0 ? (
        <div className="glass" style={{ textAlign: 'center', padding: '100px 0', borderRadius: '32px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Les épisodes arrivent bientôt. Restez branchés !</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
          {podcasts.map((p, i) => {
            const embedUrl = getYouTubeEmbedUrl(p.video_url)
            
            return (
              <div key={p.id} className="glass card-hover animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s`, borderRadius: '32px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                
                {/* Visual Area / Embed */}
                <div style={{ height: '280px', position: 'relative', background: '#000' }}>
                  {embedUrl ? (
                    <iframe 
                      width="100%" height="100%" 
                      src={embedUrl} 
                      title={p.titre} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      style={{ border: 'none' }}
                    ></iframe>
                  ) : p.thumbnail_url ? (
                    <img src={p.thumbnail_url} alt={p.titre} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--border)' }}>
                      <Play size={64} fill="var(--green)" color="var(--green)" />
                    </div>
                  )}
                  
                  {!embedUrl && (
                     <a href={p.video_url} target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                        <div style={{ background: 'var(--green)', padding: '15px', borderRadius: '50%', color: '#000', boxShadow: '0 0 30px rgba(57,230,0,0.5)' }}>
                           <Play size={30} fill="currentColor" />
                        </div>
                     </a>
                  )}
                </div>

                {/* Info Area */}
                <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} color="var(--green)" /> {new Date(p.created_at).toLocaleDateString('fr-FR')}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} color="var(--green)" /> ~15 min
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '20px', color: '#fff', lineHeight: 1.2 }}>
                    {p.titre}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '32px', fontSize: '1.05rem', flex: 1 }}>
                    {p.description || "Découvrez cet épisode passionnant de notre série de podcasts vidéo."}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                     <a href={p.video_url} target="_blank" rel="noopener noreferrer" className="btn-green" style={{ padding: '12px 24px', textDecoration: 'none', borderRadius: '12px', fontSize: '0.9rem' }}>
                        Regarder sur YouTube
                     </a>
                     <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '8px' }}>
                        <Share2 size={20} />
                     </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* CSS extra for interactions */}
      <style dangerouslySetInnerHTML={{ __html: `
        .text-gradient {
          background: linear-gradient(to right, #fff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}} />
    </div>
  )
}

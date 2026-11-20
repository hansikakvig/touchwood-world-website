"""Builds a single self-contained HTML preview (hash-routed) from the Next.js static export in ./out.
Usage: python3 scripts/build-preview.py out preview/touchwood-preview.html"""
import sys, os, re, json, base64, glob

OUT, DEST = sys.argv[1], sys.argv[2]
ROOT = os.path.dirname(os.path.abspath(OUT.rstrip("/")))

def key_for(rel):
    rel = rel.strip("/")
    if rel == "": return "home"
    if rel.startswith("ventures/"): return "venture-" + rel.split("/", 1)[1]
    if rel.startswith("blogs/"): return "blog-" + rel.split("/", 1)[1]
    return rel

def fix_links(h):
    h = re.sub(r'href="/([a-z0-9\-/]*)"', lambda m: f'href="#{key_for(m.group(1))}"', h)
    return re.sub(r"<!--.*?-->", "", h, flags=re.S)

pages = {}
for f in glob.glob(os.path.join(OUT, "**/index.html"), recursive=True):
    rel = os.path.relpath(os.path.dirname(f), OUT)
    rel = "" if rel == "." else rel
    s = open(f, encoding="utf-8").read()
    m = re.search(r"<main>(.*)</main>", s, re.S)
    pages[key_for(rel)] = fix_links(m.group(1))

idx = open(os.path.join(OUT, "index.html"), encoding="utf-8").read()
header = fix_links(re.search(r'(<div class="util">.*?</header>)', idx, re.S).group(1))
footer = fix_links(re.search(r'(<footer class="ftr">.*?</footer>)', idx, re.S).group(1))
css = "".join(open(f, encoding="utf-8").read() for f in glob.glob(os.path.join(OUT, "_next/static/css/*.css")))

mime = {".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png"}
imgs = {}
for f in glob.glob(os.path.join(OUT, "images/*")) + glob.glob(os.path.join(OUT, "logos/*")):
    rel = "/" + os.path.relpath(f, OUT)
    imgs[rel] = f"data:{mime[os.path.splitext(f)[1]]};base64," + base64.b64encode(open(f, "rb").read()).decode()

content = json.load(open(os.path.join(ROOT, "lib/content.json"), encoding="utf-8"))
extras = {
  "touchwood-lifespaces": ["Lifespaces", None, "/logos/lifespaces.png"], "touchwood-bliss": ["Bliss", None, "/logos/bliss.png"],
  "fairytale-weddings": ["Fairytale Wedding", None, "/logos/fairytale.png"], "harmony-retreat": ["Harmony Retreat", None, "/logos/harmony-retreat.png"],
  "harmony-movement": ["Harmony Movement", None, "/logos/harmony-movement.png"], "brand-and-beeyond": ["Brand & Beeyond", "/images/brandandbeeyond-hive.jpg", "/logos/brandandbeeyond.png"],
  "touchwood-foundation": ["Foundation", None, None]}
ventures = [dict(b, short=extras[b["slug"]][0], img=extras[b["slug"]][1], logo=extras[b["slug"]][2]) for b in content["biz"]]
hero = re.findall(r'\{ tag: "(.*?)", t: "(.*?)"', open(os.path.join(ROOT, "lib/data.ts"), encoding="utf-8").read())
pillars = {"biz": ["Businesses", "Real estate, hospitality, weddings, wellness, branding and a foundation. Seven ventures, one philosophy.", "ventures"],
  "ppl": ["People", "A founder-led, employee-first culture with a Chief Happiness Officer at the heart of it.", "about"],
  "str": ["Strategy", "Inspiration, aspiration, expedition and promise: one direction that every venture follows.", "about"],
  "sys": ["Systems", "Nine working principles, from customer experience to the Happy Supplier Policy.", "about"]}
pkeys = ["biz", "ppl", "str", "sys"]
for k in pkeys:  # tag hive links so the script can find them
    t = pillars[k][0]
    pages["home"] = re.sub(r'(<a class="cell hx")([^>]*>)(' + t + r'<small>)', r'\1 data-k="' + k + r'"\2\3', pages["home"], count=1)

JS = r"""
var IMG=__IMG__,P=__PAGES__,V=__V__,HERO=__HERO__,PIL=__PIL__,$=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
document.documentElement.classList.add('js');
function imgs(root){$$('img',root).forEach(function(i){var s=i.getAttribute('src');if(IMG[s])i.src=IMG[s]});$$('[style*="background-image"]',root).forEach(function(e){var m=e.getAttribute('style').match(/url\(([^)]+)\)/);if(m&&IMG[m[1]])e.style.backgroundImage='url('+IMG[m[1]]+')'})}
var T=[];function clr(){T.forEach(function(t){clearInterval(t);clearTimeout(t)});T=[]}
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function reveal(){var l=innerHeight*.92;$$('.rv:not(.in)').forEach(function(e){if(e.getBoundingClientRect().top<l)e.classList.add('in')})}
function counters(){$$('b').forEach(function(el){var v=el.textContent,m=v.match(/^([\d.]+)(.*)$/);if(!m||RM||!el.closest('.glance,.reach'))return;var to=parseFloat(m[1]),dc=m[1].indexOf('.')>-1?1:0,o=new IntersectionObserver(function(es){if(!es[0].isIntersecting)return;o.disconnect();var t0=performance.now();(function f(t){var k=Math.min((t-t0)/1400,1);el.textContent=(to*(1-Math.pow(1-k,3))).toFixed(dc)+m[2];if(k<1)requestAnimationFrame(f)})(t0)},{threshold:.5});o.observe(el)})}
function home(){var H=$('.hero');H.onpointermove=function(e){var r=H.getBoundingClientRect();H.style.setProperty('--mx',(e.clientX-r.left)+'px');H.style.setProperty('--my',(e.clientY-r.top)+'px')};var L=$$('.hs>div'),D=$$('.dots button'),i=0,t;
 function show(k){i=k;L.forEach(function(l,j){l.className=j==k?'on':''});D.forEach(function(d,j){d.className=j==k?'on':'';d.setAttribute('aria-selected',j==k)});$('.rot .pill').textContent=HERO[k][0];var p=$('.rot p');var n=p.cloneNode();n.textContent=HERO[k][1];p.replaceWith(n)}
 function go(){clearInterval(t);t=setInterval(function(){show((i+1)%HERO.length)},5500);T.push(t)}
 D.forEach(function(d,j){d.onclick=function(){show(j);go()}});go();
 var pre=$('.comb').parentNode;pre.classList.add('pre');T.push(setTimeout(function(){pre.classList.remove('pre')},200));
 $$('.comb [data-k]').forEach(function(c){var f=function(){var p=PIL[c.dataset.k];$$('.comb [data-k]').forEach(function(x){x.setAttribute('aria-pressed',x==c)});$('.panel h3').textContent=p[0];$('.panel p').textContent=p[1];var a=$('.panel a');a.textContent='Open '+p[0]+' →';a.href='#'+p[2]};c.onmouseenter=f;c.onfocus=f});
 var el=$('.cards'),paused=false;el.onmouseenter=el.ontouchstart=function(){paused=true};el.onmouseleave=function(){paused=false};
 function step(d){var w=el.firstElementChild.offsetWidth+20,end=el.scrollLeft+w>el.scrollWidth-el.clientWidth-4,st=el.scrollLeft<4;el.scrollTo({left:d>0?(end?0:el.scrollLeft+w):(st?el.scrollWidth:el.scrollLeft-w),behavior:'smooth'})}
 var b=$$('.scroll-ctl button');b[0].onclick=function(){step(-1)};b[1].onclick=function(){step(1)};if(!RM)T.push(setInterval(function(){if(!paused)step(1)},4000));
 var F=$$('.qs figure'),Q=$$('.qdots button'),j=0;function q(k){j=k;F.forEach(function(f,n){f.className=n==k?'on':''});Q.forEach(function(d,n){d.className=n==k?'on':''})}Q.forEach(function(d,n){d.onclick=function(){q(n)}});T.push(setInterval(function(){q((j+1)%F.length)},6000))}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function explorer(){var i=0,n=V.length,C=$$('.mini .cell'),art=$('.bz .slide');
 function show(k){i=k;var v=V[k];C.forEach(function(c,j){c.setAttribute('aria-pressed',j==k)});$('.ctl .count').textContent=(k+1)+' / '+n;
  var pic=v.img?'<figure class="pic" style="margin:0"><img src="'+IMG[v.img]+'" alt="'+esc(v.n)+'"></figure>':v.logo?'<figure class="pic has-logo" style="margin:0"><span class="lgx hx'+(v.logo.indexOf('fairytale')>-1?' dark':'')+'"><img src="'+IMG[v.logo]+'" alt="'+esc(v.n)+'"></span></figure>':'<figure class="pic" style="margin:0"><span class="ph-label">'+esc(v.n)+'</span></figure>';
  var a=document.createElement('article');a.className='slide slide-in';a.innerHTML=pic+'<div class="body"><span class="tag">'+esc(v.tag)+'</span><h3>'+esc(v.n)+'</h3><p class="ln">'+esc(v.line)+'</p><p class="d">'+esc(v.d)+'</p><ul class="ticks">'+v.pts.map(function(p){return '<li><i class="hx"></i>'+esc(p)+'</li>'}).join('')+'</ul><div class="cta" style="margin-top:24px"><a class="btn" href="#venture-'+v.slug+'">View '+esc(v.short)+'</a></div></div>';art.replaceWith(a);art=a}
 C.forEach(function(c,j){c.onclick=function(){show(j)}});var b=$$('.ctl .rbtn');b[0].onclick=function(){show((i+n-1)%n)};b[1].onclick=function(){show((i+1)%n)}}
function route(){var r=location.hash.slice(1);if(!P[r])r='home';clr();var m=$('main');m.innerHTML=P[r];imgs(m);scrollTo(0,0);
 $$('.menu a').forEach(function(a){var h=a.getAttribute('href').slice(1),on=h==r||(r.indexOf('venture-')==0&&h=='ventures')||(r.indexOf('blog-')==0&&h=='blogs');a.classList.toggle('act',on&&!a.closest('.sub'))});
 $('.dd-btn').classList.toggle('act',r=='ventures'||r.indexOf('venture-')==0);$('.nav-wrap').classList.remove('open');$('.burger').setAttribute('aria-expanded','false');$('.dd').classList.remove('open');
 if(r=='home')home();if(r=='ventures')explorer();counters();reveal();document.title=($('h1')?$('h1').textContent+' · ':'')+'Touchwood World'}
imgs(document);
$('.burger').onclick=function(){var o=$('.nav-wrap').classList.toggle('open');this.setAttribute('aria-expanded',o)};
$('.dd-btn').onclick=function(){var o=$('.dd').classList.toggle('open');this.setAttribute('aria-expanded',o)};
$('.dd').onmouseleave=function(){this.classList.remove('open')};
addEventListener('scroll',function(){reveal();var d=document.documentElement,mx=d.scrollHeight-innerHeight;$('.prog').style.width=(mx>0?scrollY/mx*100:0)+'%'},{passive:true});
addEventListener('hashchange',route);route();
"""
header = header.replace('src="/logos/touchwood.png"', f'src="{imgs["/logos/touchwood.png"]}"')
footer = footer.replace('src="/logos/touchwood.png"', f'src="{imgs["/logos/touchwood.png"]}"')
used = json.dumps(pages) + header + footer
imgs = {k: v for k, v in imgs.items() if k in used or k == "/images/brandandbeeyond-hive.jpg" or k.startswith("/logos/")}
JS = (JS.replace("__IMG__", json.dumps(imgs)).replace("__PAGES__", json.dumps(pages, ensure_ascii=False))
        .replace("__V__", json.dumps(ventures, ensure_ascii=False)).replace("__HERO__", json.dumps(hero))
        .replace("__PIL__", json.dumps(pillars))).replace("</script", "<\\/script")

html = f"""<title>Touchwood World</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>{css}
.hdr{{top:env(safe-area-inset-top,0px)}}</style>
{header}
<main></main>
{footer}
<script>{JS}</script>
"""
os.makedirs(os.path.dirname(DEST), exist_ok=True)
open(DEST, "w", encoding="utf-8").write(html)
print("pages:", sorted(pages), "size:", len(html) // 1024, "KB")

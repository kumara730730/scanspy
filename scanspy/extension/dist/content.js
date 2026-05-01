const i="fuzzforge-root";function r(){if(document.getElementById(i))return;const e=document.createElement("div");e.id=i;const o=e.attachShadow({mode:"closed"}),n=document.createElement("style");n.textContent=`
    .fab {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 56px;
      height: 56px;
      background: #4f46e5;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      cursor: pointer;
      z-index: 2147483647;
      transition: transform 0.2s, background 0.2s;
      border: none;
      font-family: system-ui, -apple-system, sans-serif;
      font-weight: 600;
    }
    .fab:hover {
      background: #4338ca;
      transform: scale(1.05);
    }
    .fab:active {
      transform: scale(0.95);
    }
    .tooltip {
      position: absolute;
      bottom: 70px;
      right: 0;
      background: #1f2937;
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }
    .fab:hover .tooltip {
      opacity: 1;
    }
  `;const t=document.createElement("button");t.className="fab",t.innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
    <div class="tooltip">Scan with FuzzForge</div>
  `,t.addEventListener("click",()=>{chrome.runtime.sendMessage({type:"OPEN_POPUP"}),alert("FuzzForge is ready to scan this site. Click the extension icon in your toolbar to start!")}),o.appendChild(n),o.appendChild(t),document.body.appendChild(e)}window.top===window.self&&r();

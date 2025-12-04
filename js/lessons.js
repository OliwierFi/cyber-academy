export const LESSONS = {
  'tcp-ip': {
    title: 'TCP/IP i protokoły',
    cat: 'Sieci',
    content: `<h3>TCP/IP</h3><p>Model warstwowy, TCP vs UDP, porty (80,443,22).</p>`,
    links: [{t:'RFC 791',u:'https://tools.ietf.org/html/rfc791'}]
  },
  'linux-basics': {
    title: 'Linux - Podstawy',
    cat: 'System',
    content: `<h3>Linux</h3><p>Komendy: ls, cd, chmod, chown, ps, top.</p>`,
    links: [{t:'Linux Journey',u:'https://linuxjourney.com/'}]
  },
  'osint': {
    title: 'OSINT',
    cat: 'Analiza',
    content: `<h3>OSINT</h3><p>Narzędzia: Maltego, Shodan, WHOIS, Wayback Machine.</p>`
  },
  'malware': {
    title: 'Analiza Malware',
    cat: 'Zaawansowane',
    content: `<h3>Malware</h3><p>Sandboxing, YARA, dynamiczna analiza.</p>`
  },
  'wan': {
    title: 'Sieci WAN',
    cat: 'Sieci',
    content: `<h3>WAN</h3><p>MPLS, SD-WAN, BGP, QoS.</p>`
  },
  'soc': {
    title: 'SOC Analyst',
    cat: 'Operacje',
    content: `<h3>SOC</h3><p>SIEM, triage, playbooki, eskalacje.</p>`
  },
  'python-cyber': {
    title: 'Python dla Cyber',
    cat: 'Programowanie',
    content: `<h3>Python</h3><p>Scapy, Requests, parsing logów, automatyzacja.</p>`
  }
};

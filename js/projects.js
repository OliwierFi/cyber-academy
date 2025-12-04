export const PROJECTS = {
  'sniffer': {
    title: 'Packet Sniffer',
    overview: 'Analiza pakietów z użyciem Scapy.',
    instructions: `<ol><li>pip install scapy</li><li>Utwórz skrypt sniff.py używając scapy.sniff()</li><li>Filtruj i zapisuj pakiety do pliku pcap</li></ol>`,
    examples: [{t:'GitHub - simple-sniffer', u:'#'}]
  },
  'crypto-tool': {
    title: 'Crypto Tool',
    overview: 'AES encrypt/decrypt demo',
    instructions: `<ol><li>pip install pycryptodome</li><li>Utwórz skrypt encrypt.py używając AES from Crypto.Cipher</li></ol>`,
    examples: [{t:'GitHub - aes-example', u:'#'}]
  }
};

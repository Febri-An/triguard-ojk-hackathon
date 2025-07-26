# 🔍 Smart Contract Auditor - Hackathon Project

Smart Contract Auditor adalah platform berbasis web untuk melakukan audit keamanan smart contract secara otomatis menggunakan [Mythril](https://github.com/ConsenSys/mythril) dan [Slither](https://github.com/crytic/slither). Dirancang untuk memberikan hasil analisa keamanan yang cepat, mudah, dan transparan dengan integrasi IPFS dan blockchain.

---

## 🚀 Features

- 👤 User Dashboard
- 📤 Upload Smart Contract (.sol)
- 🧠 Audit otomatis dengan Slither & Mythril
- 📊 Hasil berupa JSON + Visual Flag:
  - 🟢 Aman
  - 🟡 Perlu Diperhatikan
  - 🔴 Berbahaya
- 💾 Download hasil audit
- 🌐 Push hasil audit ke IPFS
- 🔗 Simpan hash IPFS ke Smart Contract (optional)
- 🔐 Integrasi Wallet (MetaMask)

---

## 🖼️ Workflow

1. **Masuk Dashboard**
2. **Upload file Smart Contract (.sol)**
3. **Connect Wallet (MetaMask)**
4. **Klik tombol Audit**
5. **Sistem menjalankan Mythril & Slither di backend**
6. **Hasil audit dalam bentuk `.json` di-generate**
7. **Flag keamanan ditentukan (Merah/Kuning/Hijau)**
8. **User bisa download hasil audit**
9. **Hasil audit di-push ke IPFS (dengan kepemilikan user)**
10. **User bisa menyimpan hash IPFS ke Smart Contract untuk validasi on-chain (butuh approve dan gas fee)**

---

## 🛠️ Tech Stack

- **Frontend**: React + Tailwind
- **Backend**: Node.js (Express)
- **Smart Contract**: Solidity
- **Audit Tools**: Mythril, Slither
- **Storage**: IPFS via Pinata/Web3.Storage
- **Wallet Auth**: MetaMask + Ethers.js
- **On-Chain Certify**: Smart Contract Notary

---

## 📦 Output

Setiap audit menghasilkan:
- `audit-result.json`: Detail temuan dari Slither & Mythril
- `flag`: Status keamanan (`green`, `yellow`, `red`)
- `ipfsHash`: Hash file audit yang disimpan ke IPFS
- `txHash` (optional): Hash transaksi pencatatan on-chain

---

## 🧪 Example Flag System

| Flag | Description |
|------|-------------|
| 🟢 Green | No major issues found |
| 🟡 Yellow | Medium severity issues |
| 🔴 Red | High severity or exploitable |

---

## ✅ Future Improvements

- [ ] Integrasi GPT untuk menjelaskan hasil audit dengan bahasa manusia
- [ ] Auto-fix recommendation untuk beberapa vulnerability
- [ ] Sistem ranking untuk developer berdasarkan jumlah audit

---

## 💡 License

MIT - Feel free to use or fork!

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Award, FileText, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function LayananPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="prana-navy text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center animate-fade-in">Layanan Kami</h1>
          <p className="text-xl text-center max-w-4xl mx-auto text-blue-100 animate-fade-in">
            Solusi fumigasi profesional dan layanan survei maritim dengan standar internasional untuk kebutuhan bisnis Anda
          </p>
        </div>
      </section>

      {/* Layanan Detail Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/fumigation-process.png"
                alt="Fumigasi Kontainer"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-prana-navy mb-6">Fumigasi Kontainer</h2>
              <p className="text-prana-gray mb-6">
                Layanan fumigasi kontainer kami menggunakan metode dan bahan yang diakui secara internasional, menjamin
                keamanan kargo Anda dan memenuhi standar regulasi ekspor-impor.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-prana-navy">Standar ISPM-15</h3>
                    <p className="text-prana-gray">Memenuhi standar internasional untuk pengemasan kayu</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-prana-navy">Sertifikasi AFAS</h3>
                    <p className="text-prana-gray">Treatment provider resmi dengan standar Australia</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-prana-navy">Gas Clearance</h3>
                    <p className="text-prana-gray">Pemeriksaan keamanan setelah proses fumigasi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-prana-navy mb-6">Survei Maritim</h2>
              <p className="text-prana-gray mb-6">
                Tim ahli kami melakukan inspeksi menyeluruh untuk memastikan kepatuhan dan keamanan kapal serta kargo
                sesuai dengan standar internasional.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-prana-navy">Inspeksi Kapal</h3>
                    <p className="text-prana-gray">Pemeriksaan menyeluruh kondisi dan kelaikan kapal</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-prana-navy">Survei Kargo</h3>
                    <p className="text-prana-gray">Pemeriksaan kuantitas dan kualitas muatan</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-prana-navy">Sertifikasi</h3>
                    <p className="text-prana-gray">Penerbitan sertifikat dan dokumen kepatuhan</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-1 md:order-2">
              <Image
                src="/images/fumigation-process-2.png"
                alt="Survei Maritim"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/fumigation-process-3.png"
                alt="Dokumentasi Digital"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-prana-navy mb-6">Dokumentasi Digital</h2>
              <p className="text-prana-gray mb-6">
                Sistem dokumentasi digital kami menyediakan akses mudah ke sertifikat dan laporan, memastikan efisiensi
                dalam pengelolaan dokumen kepatuhan Anda.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-prana-navy">Portal Digital</h3>
                    <p className="text-prana-gray">Akses online ke semua dokumen dan sertifikat</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-prana-navy">Tracking System</h3>
                    <p className="text-prana-gray">Pemantauan status fumigasi dan survei secara real-time</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-prana-navy">Laporan Digital</h3>
                    <p className="text-prana-gray">Dokumentasi lengkap dalam format digital yang aman</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-prana-navy mb-6">Butuh Konsultasi?</h2>
          <p className="text-prana-gray mb-8 max-w-2xl mx-auto">
            Tim ahli kami siap membantu memberikan solusi terbaik untuk kebutuhan fumigasi dan survei maritim Anda
          </p>
          <Button size="lg" className="bg-prana-navy hover:bg-prana-blue text-white font-semibold px-8">
            Hubungi Kami
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 Prana Argentum. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

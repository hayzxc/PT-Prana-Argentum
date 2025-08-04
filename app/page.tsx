import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Mail, Phone, MapPin, Award, Shield, FileText, CheckCircle } from "lucide-react"
import Link from "next/link"
import { PlaceholderImage } from "@/components/placeholder-image"
import { CompanyLogo } from "@/components/company-logo"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Matching Prana Argentum Style */}
      <section className="prana-navy text-white py-20 animate-fade-in">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in">
            <span className="italic">AFAS</span> Treatment Provider and
            <br />
            Cargo Marine Surveyor
          </h1>
          <p
            className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-blue-100 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Penyedia Layanan fumigasi dan gas clearance profesional di Surabaya dengan standar internasional, standar
            resmi untuk keamanan kargo dan kepatuhan regulasi ekspor-impor.
          </p>
          <div
            className="flex flex-col sm:flex-row justify-center gap-4 animate-scale-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button size="lg" className="bg-white text-prana-navy hover:bg-gray-100 font-semibold px-8">
              Layanan Fumigasi
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-prana-navy bg-transparent font-semibold px-8"
            >
              Konsultasi Gratis
            </Button>
          </div>

          {/* Statistics Section */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-blue-200 text-sm">Tahun Pengalaman</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200 text-sm">Jumlah Klien</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-200 text-sm">Standar Internasional</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-200 text-sm">Layanan Darurat</div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Services Section */}
      <section className="py-16 prana-light-gray">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-prana-blue mb-4 animate-fade-in">Layanan Profesional</h2>
          <div className="w-16 h-1 bg-prana-blue mx-auto mb-8"></div>
          <p className="text-prana-gray mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Layanan fumigasi dan gas clearance dengan standar AFAS yang diakui secara internasional
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="certificate-card stagger-item bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-prana-blue" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-prana-navy">Fumigasi Kontainer</h3>
                <p className="text-prana-gray mb-6">
                  Layanan fumigasi kontainer profesional dengan standar ISPM-15 dan sertifikasi internasional untuk
                  ekspor-impor.
                </p>
                <div className="space-y-2 text-sm text-prana-gray">
                  <p className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Sertifikat AFAS
                  </p>
                  <p className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Standar ISPM-15
                  </p>
                  <p className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Gas Clearance
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="certificate-card stagger-item bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-prana-navy">Marine Survey</h3>
                <p className="text-prana-gray mb-6">
                  Survei maritim profesional untuk kapal, inspeksi lambung, dan sertifikasi kepatuhan maritim
                  internasional.
                </p>
                <div className="space-y-2 text-sm text-prana-gray">
                  <p className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Inspeksi Kapal
                  </p>
                  <p className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Survei Asuransi
                  </p>
                  <p className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Sertifikasi
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="certificate-card stagger-item bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-prana-navy">Dokumentasi Digital</h3>
                <p className="text-prana-gray mb-6">
                  Sistem dokumentasi digital lengkap termasuk sertifikat, laporan, dan dokumentasi kepatuhan.
                </p>
                <div className="space-y-2 text-sm text-prana-gray">
                  <p className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Portal Digital
                  </p>
                  <p className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Sertifikat Online
                  </p>
                  <p className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Tracking System
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 animate-slide-in">
              <img
                src="/images/our-team.png"
                width={600}
                height={400}
                alt="Tim profesional Prana Argentum"
                className="rounded-lg shadow-xl object-cover w-full h-full"
              />
            </div>
            <div className="md:w-1/2 md:pl-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-3xl font-bold text-prana-navy mb-6">Tentang Prana Argentum</h2>
              <p className="text-prana-gray mb-4">
                Prana Argentum adalah perusahaan penyedia layanan fumigasi dan surveyor maritim terkemuka yang berkantor
                pusat di Surabaya, mengkhususkan diri dalam layanan inspeksi, sertifikasi, dan dokumentasi komprehensif
                untuk industri maritim dan logistik.
              </p>
              <p className="text-prana-gray mb-6">
                Dengan pengalaman bertahun-tahun dan tim profesional bersertifikat, kami berkomitmen memberikan solusi
                fumigasi yang efektif, aman, dan sesuai standar internasional untuk inspeksi kargo, survei maritim, dan
                layanan jaminan kualitas.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg stagger-item">
                  <h3 className="font-semibold text-prana-blue">Pengalaman</h3>
                  <p className="text-2xl font-bold text-prana-navy">20+ Tahun</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg stagger-item">
                  <h3 className="font-semibold text-prana-blue">Survei Selesai</h3>
                  <p className="text-2xl font-bold text-prana-navy">5,000+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Portal Section */}
      <section id="certifications" className="py-16 prana-light-gray">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-prana-blue mb-4 animate-fade-in">
            Portal Sertifikasi Digital
          </h2>
          <div className="w-16 h-1 bg-prana-blue mx-auto mb-12"></div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg shadow-lg mx-auto mb-6 max-w-md certificate-card border border-blue-100">
              <div className="text-center">
                <div className="w-20 h-20 bg-prana-navy rounded-full mx-auto flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-prana-navy mb-2">SERTIFIKAT SURVEI</h4>
                <p className="text-sm text-prana-blue font-semibold mb-4">PRANA ARGENTUM</p>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium inline-block">
                  TERSERTIFIKASI ✓
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 animate-slide-in text-prana-navy">Akses Sertifikat Anda</h3>
            <p className="text-prana-gray mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Klien dapat mengakses dan mengunduh sertifikat digital mereka. Administrator dapat mengelola dan
              menerbitkan sertifikat baru untuk layanan survei yang telah selesai.
            </p>
            <div className="animate-scale-in" style={{ animationDelay: "0.4s" }}>
              <Link href="/login">
                <Button size="lg" className="bg-prana-navy hover:bg-prana-blue text-white font-semibold px-8">
                  Login ke Portal Sertifikat
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 prana-navy text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-slide-in">
              <h2 className="text-3xl font-bold mb-6">Hubungi Kami Sekarang</h2>
              <p className="text-blue-100 mb-8">
                Dapatkan konsultasi gratis untuk kebutuhan fumigasi dan survei maritim Anda. Tim ahli kami siap
                memberikan solusi terbaik.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-4 text-blue-300" />
                  <div>
                    <p className="font-semibold">(031) 99021411</p>
                    <p className="text-blue-200 text-sm">Hotline 24/7</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-4 text-blue-300" />
                  <div>
                    <p className="font-semibold">prana_surabaya@yahoo.com.sg</p>
                    <p className="text-blue-200 text-sm">Email</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-6 h-6 mr-4 text-blue-300 mt-1" />
                  <div>
                    <p className="font-semibold">Kantor Pusat Surabaya</p>
                    <p className="text-blue-200 text-sm">
                      Jl. Ikan Mungsing V No.77, Perak Barat
                      <br />
                      Kec. Krembangan, Surabaya, Jawa Timur
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Card className="bg-white text-gray-800 border-0 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-prana-navy">Permintaan Penawaran</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-prana-navy">Jenis Layanan</label>
                      <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-prana-blue focus:border-transparent">
                        <option>Fumigasi Kontainer</option>
                        <option>Survei Maritim</option>
                        <option>Inspeksi Pra-Pengiriman</option>
                        <option>Survei Asuransi</option>
                        <option>Kontrol Kualitas</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-prana-navy">Lokasi</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-prana-blue focus:border-transparent"
                        placeholder="Pelabuhan Tanjung Perak"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-prana-navy">Deskripsi</label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-prana-blue focus:border-transparent"
                        rows={3}
                        placeholder="Deskripsi singkat kebutuhan Anda"
                      ></textarea>
                    </div>
                    <Button className="w-full bg-prana-navy hover:bg-prana-blue text-white font-semibold">
                      Kirim Permintaan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-slide-in">
              <div className="flex items-center space-x-2 mb-4">
                <CompanyLogo size="sm" showText={false} />
                <span className="text-xl font-semibold">Prana Argentum</span>
              </div>
              <p className="text-gray-300 mb-4">
                Layanan fumigasi dan survei maritim profesional dengan standar internasional.
              </p>
              <div className="text-sm text-gray-400">
                <p>Surveyor Bersertifikat</p>
                <p>ISO 9001:2015</p>
              </div>
            </div>

            <div className="stagger-item">
              <h4 className="text-lg font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Fumigasi Kontainer</li>
                <li>Survei Maritim</li>
                <li>Inspeksi Pra-Pengiriman</li>
                <li>Survei Asuransi</li>
                <li>Kontrol Kualitas</li>
              </ul>
            </div>

            <div className="stagger-item">
              <h4 className="text-lg font-semibold mb-4">Area Layanan</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Pelabuhan Tanjung Perak</li>
                <li>Terminal Kontainer</li>
                <li>Area Industri</li>
                <li>Gudang Logistik</li>
                <li>Fasilitas Maritim</li>
              </ul>
            </div>

            <div className="stagger-item">
              <h4 className="text-lg font-semibold mb-4">Kontak Darurat</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>Hotline 24/7</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>Respon Darurat</span>
                </li>
                <li>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 mt-2" asChild>
                    <a href="https://wa.me/6280000000000" target="_blank" rel="noreferrer">
                      WhatsApp 24/7
                    </a>
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 animate-fade-in">
            <p>© 2025 Prana Argentum. All rights reserved. | Layanan Fumigasi Profesional Surabaya</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

import localFont from "next/font/local";
import React from "react";
import PatronComponent from "./PatronComponent";

const jaini = localFont({ src: "../app/fonts/jaini.ttf" });

const Title = ({ text }: { text: string }) => (
  <h1 className={`${jaini.className} text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-center drop-shadow-[0_0_15px_rgba(147,51,234,0.3)] mb-10`}>
    {text}
  </h1>
);

const PatronCom = () => {
  return (
    <div className="relative flex flex-col items-center justify-center py-20 px-4 overflow-hidden max-w-7xl mx-auto">
      {/* Background ambient light */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="w-full mb-20">
        <Title text="Patrons" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PatronComponent name="Dr. B. S. Ragini Narayan" designation="Donor Trustee & Chairperson, BMSET" />
          <PatronComponent name="Dr. P. Dayananda Pai" designation="Chairperson, BMSCE & Life Trustee, BMSET" />
          <PatronComponent name="Shri Aviram Sharma" designation="Trustee, BMSET" />
        </div>
      </div>

      <div className="w-full mb-20">
        <Title text="Advisory Committee" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PatronComponent name="Dr. Bheemsha Arya" designation="Principal, BMSCE" />
          <PatronComponent name="Dr. Seshachalam D" designation="Vice Principal - Admin" />
          <PatronComponent name="Dr. L. Ravikumar" designation="Vice Principal - Academic" />
        </div>
      </div>

      <div className="w-full mb-20">
        <Title text="Faculty Core Committee" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PatronComponent name="Dr. Rajeshwari Hegde" designation="Working Chairman" />
          <PatronComponent name="Dr. Niranjan K. R." designation="Organising Secretary" />
          <PatronComponent name="Prof. Namratha M." designation="Joint Organising Secretary" />
          <PatronComponent name="Prof. Chaitanya L." designation="Faculty Treasurer" />
          <PatronComponent name="Dr. Chethana K. Y." designation="Department of Aerospace engineering" />
          <PatronComponent name="Dr. Kaliprasad C. S." designation="Department of Physics" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          <PatronComponent name="Prof. Manoj Kumar S." designation="Department of Computer Science and Data Science" />
          <PatronComponent name="Dr. Soumya Lakshmi B. S." designation="Department of Machine Learning" />
        </div>
      </div>

      <div className="w-full">
        <Title text="Student Core Committee" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PatronComponent name="Amogh Ananda" />
          <PatronComponent name="B. S. Shreevidya" />
          <PatronComponent name="Chinmayi Anand" />
          <PatronComponent name="G. Divyashree" />
          <PatronComponent name="Sevitha N" />
          <PatronComponent name="Tulasikrishna Tammina" />
        </div>
        <div className="mt-6 max-w-sm mx-auto">
          <PatronComponent name="Varun Reddy" />
        </div>
      </div>
    </div>
  );
};

export default PatronCom;
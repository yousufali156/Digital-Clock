import React, { useState } from 'react';
import GlassCard from './GlassCard';
import { Sparkles } from './Icons';

// 100টি ভিন্ন ভিন্ন কাজের একটি তালিকা
const goalsList: string[] = [
    "Organize one drawer or shelf.",
    "Go for a 15-minute walk without your phone.",
    "Write down three things you're grateful for.",
    "Read a chapter of a book.",
    "Try a 5-minute meditation session.",
    "Unsubscribe from 5 email newsletters you don't read.",
    "Drink a glass of water right now.",
    "Stretch your body for 10 minutes.",
    "Plan your meals for tomorrow.",
    "Listen to a new podcast episode.",
    "Watch a short documentary.",
    "Clean your computer's desktop.",
    "Wipe down your keyboard and mouse.",
    "Learn a new keyboard shortcut.",
    "Do one small thing you've been procrastinating on.",
    "Call a friend or family member just to say hi.",
    "Write a short, positive review for a local business.",
    "Doodle or sketch for 10 minutes.",
    "Water your plants.",
    "Plan a fun activity for the weekend.",
    "Learn to say 'hello' in a new language.",
    "Take a picture of something that makes you happy.",
    "Tidy up your workspace for 5 minutes.",
    "Hold a plank for as long as you can.",
    "Compliment the next person you talk to.",
    "Put on your favorite song and dance.",
    "Make your bed if you haven't already.",
    "Write down a goal for the week.",
    "Step outside and take 10 deep breaths.",
    "Put away any clothes that are lying around.",
    "Delete old photos from your phone.",
    "Think of one positive memory.",
    "Make a to-do list for tomorrow.",
    "Find a new healthy recipe to try.",
    "Do 20 jumping jacks.",
    "Put one item you don't use in a donation box.",
    "Read one article about a topic that interests you.",
    "Spend 10 minutes learning a new skill online.",
    "Start a conversation with someone new.",
    "Leave a positive comment on a social media post.",
    "Organize your phone's home screen.",
    "Try to solve a riddle or a brain teaser.",
    "Eat a piece of fruit.",
    "Make a cup of tea or coffee and enjoy it slowly.",
    "Look out the window and find something beautiful.",
    "Write a thank-you note to someone.",
    "Put all your shoes in their proper place.",
    "Clear out your wallet or purse.",
    "Do a quick digital detox for 30 minutes.",
    "Think about something you're looking forward to.",
    "Create a new music playlist.",
    "Wash your face and moisturize.",
    "Do a quick 5-minute tidy of your living room.",
    "Tell someone you appreciate them.",
    "Research a place you'd like to visit someday.",
    "Fix something small that's broken.",
    "Take out the trash.",
    "Plan your outfit for tomorrow.",
    "Learn one interesting fact.",
    "Review your budget for 5 minutes.",
    "Practice smiling in the mirror.",
    "Identify one bad habit you want to change.",
    "Wipe your kitchen counters.",
    "Do a task for someone else without being asked.",
    "Recycle something you were about to throw away.",
    "Put your phone on silent for an hour.",
    "Watch a funny video online.",
    "Think of a solution to a small problem.",
    "Set a reminder to do something kind tomorrow.",
    "Update one of your online profiles.",
    "Read the instructions for something you use often.",
    "Make a list of 5 things that make you smile.",
    "Throw away any expired food from your fridge.",
    "Fold your laundry.",
    "Try a new type of exercise.",
    "Sing along to your favorite song.",
    "Write down an idea, no matter how silly.",
    "Learn the name of a plant or bird in your area.",
    "Do a quick self-assessment of your posture.",
    "Find a tutorial for something you want to learn.",
    "Light a candle or use a diffuser.",
    "Put fresh sheets on your bed.",
    "Send an encouraging message to a friend.",
    "Organize your bookshelf.",
    "Clean the mirrors in your bathroom.",
    "Try to draw something from memory.",
    "Pay a bill that's due soon.",
    "Watch the clouds for a few minutes.",
    "Plan a simple, kind gesture for someone.",
    "Think of one thing you've accomplished this week.",
    "Unfollow social media accounts that don't make you feel good.",
    "Schedule an important appointment you've been putting off.",
    "Sweep or vacuum one room.",
    "Prepare your coffee/tea maker for the morning.",
    "Lay out your vitamins or medication for tomorrow.",
    "Read a short poem.",
    "Put a new, inspirational quote on your desk."
];


const GeminiGoalGenerator: React.FC = () => {
    const [goal, setGoal] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchGoal = () => {
        setIsLoading(true);
        setError(null);
        setGoal('');

        // Simulate a network delay for a better user experience.
        setTimeout(() => {
            try {
                // Randomly pick a goal from the predefined list.
                const randomIndex = Math.floor(Math.random() * goalsList.length);
                const randomGoal = goalsList[randomIndex];
                setGoal(randomGoal);
            } catch (err) {
                console.error(err);
                setError("Could not suggest a goal. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }, 800); // 0.8 second delay
    };

    return (
        <GlassCard className="p-6 h-full flex flex-col justify-center">
            <h2 className="text-xl font-bold text-cyan-300 mb-4">Goal Suggester</h2>
            <div className="flex flex-col items-center text-center">
                <button onClick={fetchGoal} disabled={isLoading} className="flex items-center gap-2 bg-cyan-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-cyan-600 transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed">
                    <Sparkles size={20} />
                    {isLoading ? "Suggesting..." : "Suggest a Goal"}
                </button>
                {error && <p className="text-red-400 mt-4">{error}</p>}
                {goal && (
                    <div className="mt-4 bg-black/20 p-4 rounded-lg w-full">
                        <p className="text-lg italic text-amber-300">"{goal}"</p>
                    </div>
                )}
            </div>
        </GlassCard>
    );
};

export default GeminiGoalGenerator;


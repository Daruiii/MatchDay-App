import { LinearGradient } from 'expo-linear-gradient';

const GradientBackground = ({ children }) => {
    return (
        <LinearGradient
            colors={['#0a0a0f', '#1a1525', '#251a35']}
            locations={[0, 0.5, 1]}
            style={{ flex: 1 }}
        >
            {children}
        </LinearGradient>
    );
};

export default GradientBackground;
